/* Render the four selected stages from the UniPred project site's own drawPanel.
   Serve ../unipred.github.io at SOURCE_ORIGIN first; requires Playwright, Chrome,
   ffmpeg. No changes are made to the source project. */
const { chromium } = require('playwright');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const output = process.env.PREVIEW_OUTPUT || path.resolve(__dirname, '../images/unipred');
const sourceRoot = process.env.UNIPRED_SOURCE || path.resolve(__dirname, '../../unipred.github.io');
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'unipred-personal-film-'));
fs.mkdirSync(output, { recursive: true });
const encoding = ['-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '20', '-pix_fmt', 'yuv420p', '-r', '24', '-movflags', '+faststart'];
function ffmpeg(args) {
  const p = spawn(process.env.FFMPEG_PATH || 'ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: ['pipe', 'inherit', 'inherit'] });
  p.done = new Promise((resolve, reject) => { p.on('error', reject); p.on('close', code => code === 0 ? resolve() : reject(new Error('ffmpeg: ' + code))); });
  return p;
}
(async () => {
  const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', headless: true, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
    await page.goto(process.env.SOURCE_ORIGIN || 'http://127.0.0.1:8031', { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => flowAssets.agent?.complete && flowAssets.state1?.complete && flowAssets.state2?.complete);
    await page.evaluate(async () => {
      motionPaused = true; diagramPaused = true; updateMotion();
      document.querySelectorAll('video').forEach(v => v.pause());
      await document.fonts.ready;
      const mark = new Image();
      mark.src = 'static/images/unipred-mark.svg';
      await mark.decode();
      const canvas = document.createElement('canvas');
      canvas.width = 960; canvas.height = 720;
      window.renderPersonalPreview = (stage, p) => {
        const c = canvas.getContext('2d');
        c.fillStyle = '#ffffff'; c.fillRect(0, 0, 960, 720);
        c.drawImage(mark, 29, 23, 30, 30);
        V.label(c, 'UniPred', 70, 46, 25, '#152e4b', 'left', 500);
        V.label(c, `0${stage + 1} / 04`, 928, 43, 16, '#67727e', 'right');
        phase = stage + 2;
        phaseElapsed = p * flowDurations[phase];
        if (stage < 3) {
          c.save();
          c.globalAlpha = Math.min(1, p * 20);
          drawPanel(c, stage, true, 105, stage === 2 ? 40 : 70, 2.2, p * [4.8, 3.2, 4][stage]);
          c.restore();
        } else {
          V.label(c, 'Actual robot · table cleaning', 474.6, 622.2, 30.8, V.muted);
        }
        c.fillStyle = '#e1e6eb'; c.fillRect(28, 654, 904, 1);
        ['Feedback', 'Concept', 'Plan', 'Action'].forEach((label, i) => {
          const x = 28 + 231 * i;
          if (i === stage) { c.fillStyle = '#152e4b'; c.fillRect(x, 653, 184, 3); }
          V.label(c, label, x, 694, 23, i === stage ? '#152e4b' : '#798590', 'left', i === stage ? 500 : 400);
        });
        return canvas.toDataURL('image/jpeg', 0.95).split(',')[1];
      };
    });
    const poster = await page.evaluate(() => renderPersonalPreview(1, .8));
    fs.writeFileSync(path.join(output, 'preview-poster.jpg'), Buffer.from(poster, 'base64'));
    const intro = path.join(work, 'intro.mp4');
    const encoder = ffmpeg(['-f', 'image2pipe', '-vcodec', 'mjpeg', '-framerate', '24', '-i', 'pipe:0', ...encoding, intro]);
    const durations = [4.8, 3.2, 4];
    for (let stage = 0; stage < 3; stage++) {
      const frames = Math.round(durations[stage] * 24);
      for (let i = 0; i < frames; i++) {
        const jpg = await page.evaluate(({ stage, p }) => renderPersonalPreview(stage, p), { stage, p: i / (frames - 1) });
        if (!encoder.stdin.write(Buffer.from(jpg, 'base64'))) await once(encoder.stdin, 'drain');
      }
      console.log('Rendered stage:', ['Feedback', 'Concept', 'Plan'][stage]);
    }
    encoder.stdin.end();
    await encoder.done;
    const backdrop = await page.evaluate(() => renderPersonalPreview(3, 0));
    const frame = path.join(work, 'action-frame.jpg');
    fs.writeFileSync(frame, Buffer.from(backdrop, 'base64'));
    const action = path.join(work, 'action.mp4');
    await ffmpeg(['-loop', '1', '-framerate', '24', '-i', frame, '-ss', '38', '-t', '8', '-i', path.join(sourceRoot, 'static/videos/web/main_demo_1.mp4'), '-filter_complex', '[1:v]scale=718:404,setsar=1[robot];[0:v][robot]overlay=118:140:shortest=1,fps=24,setsar=1[out]', '-map', '[out]', '-t', '8', ...encoding, action]).done;
    fs.writeFileSync(path.join(work, 'concat.txt'), "file 'intro.mp4'\nfile 'action.mp4'\n");
    await ffmpeg(['-f', 'concat', '-safe', '0', '-i', path.join(work, 'concat.txt'), '-c', 'copy', '-movflags', '+faststart', path.join(output, 'preview.mp4')]).done;
    console.log('Saved 20-second preview:', path.join(output, 'preview.mp4'));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exit(1); });
