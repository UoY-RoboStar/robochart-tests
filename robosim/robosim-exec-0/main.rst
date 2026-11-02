interface IEvents {
	event inp : nat
	event outp : nat
}

stm stm0 {
	var x : nat = 0
	input context { event inp : nat }
	output context { event outp : nat }
	cycleDef cycle == 1
	initial i0
	state s0 {
	}

	transition t0 {
		from i0
		to s0
	}
	transition t1 {
		from s0
		to s0
		exec
		condition $inp?x
		action $outp!x
	}
transition t2 {
		from s0
		to s0
		exec
		condition not $inp 
		action $outp!x
	}
}

