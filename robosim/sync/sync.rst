controller Ctrl0 {
	cycleDef cycle == 1
	event a
	event b
	stm A {
		cycleDef cycle == 1
		input context {
			event a
		}
		output context {
			event i1 
		}
		initial I
		state S1 {
		}
		state S2 {
		}
		transition t0 {
			from I
			to S1
		}
		transition t1 {
			from S1
			to S2
			condition $a
			action $i1
		}
		transition t2 {
			from S1
			to S1
			exec
			condition not $a
		}
	transition t3 {
			from S2
			to S2
			exec
		}
	}

	stm B {
		cycleDef cycle == 1
		input context {
			event i2
		}
		output context {
			event b
		}
		initial I
		state S1 {
		}
		state S2 {
		}
		transition t0 {
			from I
			to S1
		}
		transition t1 {
			from S1
			to S2
			condition $i2
			action $b
		} 
		transition t2 {
			from S1
			to S1 
			exec
			condition not $i2
		}
	transition t3 { 
			from S2
			to S2
			exec
		}
	}

	connection A on i1 to B on i2
	connection Ctrl0 on a to A on a
	connection B on b to Ctrl0 on b
}

