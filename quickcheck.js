const fs = require('fs')
const { execSync } = require('child_process');

let untimed_path = 'csp-gen/'
let timed_path = 'csp-gen/timed/'

let untimed = fs.readdirSync(untimed_path).filter((x) => x.endsWith("_assertions.csp"))
let timed = fs.readdirSync(timed_path).filter((x) => x.endsWith("_assertions.csp"))

let results = []

let files_with_errors = []
let checked_assertions = 0
let successful_assertions = 0

for (f in untimed) {
	let file = untimed_path+untimed[f]
	console.log("Checking", file)
	// stderr is sent to stderr of parent process
	// you can set options.stdio if you want it to go elsewhere
	let result = execSync(`refines ${file} -qbf json`);
	let json = JSON.parse(result)
	delete json.copyright_notice
	delete json.license_type
	results.push(json)
}


for (f in timed) {
	let file = timed_path+untimed[f]
	console.log("Checking", file)
	// stderr is sent to stderr of parent process
	// you can set options.stdio if you want it to go elsewhere
	let result = execSync(`refines ${file} -qbf json`);
	let json = JSON.parse(result)
	delete json.copyright_notice
	delete json.license_type
	results.push(json)
}

console.log("\nResults\n")

for (i in results) {
	let r = results[i]
	if (r.errors.length > 0) {
		files_with_errors.push(r.file_name)
		console.log(r)
	} else {
		let rs = r.results
		for (j in rs) {
			checked_assertions++
			if (rs[j].result == 1) {
				successful_assertions++
			}
		}
	}
}

console.log(`\x1b[36mFound errors in ${files_with_errors.length} file(s).\x1b[0m`)
console.log(`Success: ${successful_assertions} out of ${checked_assertions}.`)



