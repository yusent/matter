#!/bin/sh

for size in xxs xs s m l xl xxl xxxl; do
  upperCaseSize=`echo $size | tr "[:lower:]" "[:upper:]"`
  ./node_modules/karma/bin/karma start --browsers "PhantomJS_$upperCaseSize" --grep "display size is $size"
done
