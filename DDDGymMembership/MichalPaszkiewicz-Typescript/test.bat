@echo off
cd tests
call tsc
call npm test
cd ..
pause