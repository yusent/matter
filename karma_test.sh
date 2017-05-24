#!/bin/sh

for size in xxs xs s m l xl xxl xxxl; do
  upperCaseSize=`echo $size | tr "[:lower:]" "[:upper:]"`
  karma start --browsers "PhantomJS_$upperCaseSize" --grep "display size is $size"
done
