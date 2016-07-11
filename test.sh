#!/bin/bash

function find_tests {
  find test -type f -iname "*.js" -print0
}

function run_test {
  node_modules/.bin/mocha ${1} --reporter tap | remove_tap_comments
}

function remove_tap_comments {
  grep -v -e '^\s\s'
}

function expected_output {
  cat ${1%.*}.txt
}

success=1

while IFS= read -r -d $'\0' scenario; do
  actual=$(run_test ${scenario})
  expected=$(expected_output ${scenario})
  differences=$(diff <(echo -e "${actual}") <(echo -e "${expected}"))
  if [ -z "${differences}" ]; then
    echo "[pass] ${scenario}"
  else
    echo "[fail] ${scenario}"
    echo -e "----\n${differences}\n----"
    success=0
  fi
done < <(find_tests)

if [ ${success} -eq 1 ]; then
  echo "BUILD SUCCESSFUL"
else
  echo "BUILD FAILED"
fi
