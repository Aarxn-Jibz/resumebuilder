@echo off

git add .
if "%~1"=="" (set "MSG=Default Commit Message"
) else (
  set "MSG=%*"
)
git commit -m "%MSG%"
git push
