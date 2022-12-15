interface IOutputs {
	event out1 : nat
	event out2 : nat
}

interface IOps {
	op ( p : nat )
}

controller ctrl0 {
	uses IOutputs opref op_ref0 = op
	sref stm_ref0 = stm0
	connection stm_ref0 on out2 to ctrl0 on out2
	connection stm_ref0 on out1 to ctrl0 on out1
	cycleDef cycle == 1
}

stm stm0 {
	requires IOps input context { }
	output context { uses IOutputs }
	cycleDef cycle == 1
	initial i0
	state s0 {
		during op(1)
	initial i0
		state s0 {
			during op(0)
		}
		transition t0 {
			from i0
			to s0
		}
	}
	transition t0 {
		from i0
		to s0
	}
}

operation op ( p : nat
) {
	var x : nat
	initial i0
	junction j0
	final f0
	transition t0 {
		from i0
		to j0
		action x = p
	}
	transition t1 {
		from j0
		to f0
		condition p == 1
		action 
	$  out2 ! x
	}
	transition t2 {
		from j0
		to f0
		condition p == 0
		action $ out1 ! x
	}
	input context { }
	output context { uses IOutputs }
}

