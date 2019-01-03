#!/bin/bash

function find_js_tests {
  find test -type f -iname "*.js" -print0
}

function find_ts_tests {
  find test -type f -iname "*.ts" -print0
}

function run_js_test {
  node_modules/.bin/mocha ${1} --reporter tap | remove_tap_comments
}

function run_ts_test {
  node_modules/.bin/mocha -r ts-node/register ${1} --reporter tap | remove_tap_comments
}

function remove_tap_comments {
  grep -v -e '^\s\s'
}

function expected_output {
  cat ${1%.*}.txt
}

success=1

while IFS= read -r -d $'\0' scenario; do
  actual=$(run_js_test ${scenario})
  expected=$(expected_output ${scenario})
  differences=$(diff <(echo -e "${actual}") <(echo -e "${expected}"))
  if [ -z "${differences}" ]; then
    echo "[pass] ${scenario}"
  else
    echo "[fail] ${scenario}"
    echo -e "----\n${differences}\n----"
    success=0
  fi
done < <(find_js_tests)

while IFS= read -r -d $'\0' scenario; do
  actual=$(run_ts_test ${scenario})
  expected=$(expected_output ${scenario})
  differences=$(diff <(echo -e "${actual}") <(echo -e "${expected}"))
  if [ -z "${differences}" ]; then
    echo "[pass] ${scenario}"
  else
    echo "[fail] ${scenario}"
    echo -e "----\n${differences}\n----"
    success=0
  fi
done < <(find_ts_tests)

if [ ${success} -eq 1 ]; then
  echo "BUILD SUCCESSFUL"
else
  echo "BUILD FAILED"
fi
