"""Package an existing static build and its editable sources without secrets."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import hashlib

root = Path(__file__).resolve().parent.parent
out = root / 'output'
hosting = out / 'gazglogow-hosting'
assert hosting.is_dir() and (hosting / 'index.html').is_file()
assert (hosting / '.htaccess').is_file()
for built_file in (root / 'dist').rglob('*'):
    if built_file.is_file():
        packaged_file = hosting / built_file.relative_to(root / 'dist')
        assert built_file.read_bytes() == packaged_file.read_bytes(), f'Stale package: {packaged_file}'

with ZipFile(out / 'gazglogow-hosting.zip', 'w', ZIP_DEFLATED) as archive:
    for file in sorted(hosting.rglob('*')):
        if file.is_file():
            archive.write(file, file.relative_to(hosting).as_posix())

source_dirs = ['src', 'public', 'assets', 'scripts', 'tests']
source_files = ['README.md', 'PLAN.md', 'REVIEW.md', 'DEPLOYMENT.md',
                'package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml',
                'astro.config.mjs', 'eslint.config.mjs', 'tsconfig.json',
                '.gitignore', '.env.example', 'Prompt do planu działania.txt']
with ZipFile(out / 'gazglogow-zrodla.zip', 'w', ZIP_DEFLATED) as archive:
    for name in source_dirs:
        for file in sorted((root / name).rglob('*')):
            if file.is_file() and '__pycache__' not in file.parts:
                archive.write(file, file.relative_to(root).as_posix())
    for name in source_files:
        archive.write(root / name, name)

for name in ['gazglogow-hosting.zip', 'gazglogow-zrodla.zip']:
    file = out / name
    with ZipFile(file) as archive:
        assert archive.testzip() is None
        names = archive.namelist()
        assert not any('node_modules/' in n or n.endswith('/.env') or n == '.env' for n in names)
        if 'hosting' in name:
            assert 'index.html' in names and '.htaccess' in names
            assert len([n for n in names if n.endswith('.html')]) == 6
    print(name, file.stat().st_size, 'bytes', 'SHA256', hashlib.sha256(file.read_bytes()).hexdigest())
