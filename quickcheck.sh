LIST=$(ls csp-gen/*_assertions.csp csp-gen/timed/*_assertions.csp)
files_with_errors=()
let total=0
let pass=0
for f in $LIST
do
printf '\e[48;5;190m\e[38;5;196mchecking %s\e[0m\n' "${f}"
check=$(refines -t $f 2>&1 >/dev/null)
if [ -z "$check" ]
then
	result=$(refines -qb $f | tail -n +3)
	let total+=$(echo "$result" | wc -l)
	let pass+=$(echo "$result" | grep "Passed" | wc -l)
	echo "$result"
else
	printf '\e[38;5;196m%s\e[0m\n' "${check}"
	files_with_errors+=($f)
fi
done
printf '\n'
if [ ${#files_with_errors[@]} -gt 0 ]
then
	printf '\e[48;5;196m%s\e[0m\n' "Found errors in ${#files_with_errors[@]} file(s)."
fi

printf '\e[48;5;021m\e[38;5;255m%s\e[0m\n' "Success rate: $pass/$total."



#RESULT=$(refines -qb csp-gen/*_assertions.csp csp-gen/timed/*_assertions.csp | tail -n +3)
#total=$(echo "$RESULT" | wc -l)
#fail=$(echo "$RESULT" | grep "Failed" | wc -l)
#passed=$(echo "$RESULT" | grep "Passed" | wc -l)
#echo "$RESULT"
#printf "\e[48;5;021m%s" "success: $passed/$total";
#printf '\e[0m';
#echo ""