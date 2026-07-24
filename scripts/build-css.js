const { mkdirSync } = require('fs');
const { spawn, spawnSync } = require('child_process');
const path = require('path');

const root = path.resolve(__dirname, '..');
const cli = require.resolve('tailwindcss/lib/cli.js');
const watch = process.argv.includes('--watch');

const jobs = [
  ['tailwind.config.js', 'src/input.css', 'dist/output.css'],
  ['tailwind.config.js', 'src/pages/agenda.css', 'dist/agenda.css'],
  ['tailwind.config.js', 'src/pages/blog-panel.css', 'dist/blog-panel.css'],
  ['tailwind.config.js', 'src/pages/blog.css', 'dist/blog.css'],
  ['tailwind.config.js', 'src/pages/blog-post.css', 'dist/blog-post.css'],
  ['tailwind.config.js', 'src/pages/martelinho.css', 'dist/martelinho.css'],
  ['tailwind.peliculas.config.js', 'src/pages/peliculas.css', 'dist/peliculas.css'],
  ['tailwind.config.js', 'src/pages/ppf.css', 'dist/ppf.css'],
  ['tailwind.servicos.config.js', 'src/pages/servicos.css', 'dist/servicos.css'],
  ['tailwind.config.js', 'src/pages/orcamento.css', 'dist/orcamento.css'],
];

mkdirSync(path.join(root, 'dist'), { recursive: true });

function argsFor([config, input, output]) {
  return [
    cli,
    '--config', path.join(root, config),
    '--input', path.join(root, input),
    '--output', path.join(root, output),
    watch ? '--watch' : '--minify',
  ];
}

if (watch) {
  const children = jobs.map((job) => spawn(process.execPath, argsFor(job), {
    cwd: root,
    stdio: 'inherit',
  }));

  const stop = () => {
    children.forEach((child) => child.kill());
    process.exit();
  };

  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
} else {
  for (const job of jobs) {
    const result = spawnSync(process.execPath, argsFor(job), {
      cwd: root,
      stdio: 'inherit',
    });

    if (result.status !== 0) {
      process.exit(result.status || 1);
    }
  }
}
