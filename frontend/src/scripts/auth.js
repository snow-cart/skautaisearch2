export async function tryAuth(attemptAuthCode) {
	const response = await fetch('https://bonk.lt/api/items/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'authCode': attemptAuthCode,
		})
	}).catch(err => console.error(err));

	console.log("Login responded with status: ", response.status);
	if (response.status===200) {
		console.log("200", response.status);	
		return true;
	}
	else if (response.status===401) {
		console.log("401", response.status);
		return false;
	}
	else throw new Error("Error logging in");
}

// Below already deprecated, keeping for future reference //

// export async function getAuthCode () {
// 		let attemptAuthCode = prompt("Enter auth code:");
// 		if (attemptAuthCode === null){
// 			window.location.href= '/';
// 			return 0;
// 		}
// 		if ( await tryAuth(attemptAuthCode) === true)  {
// 			// PlaceYourAuthCodeHere
// 			console.log(attemptAuthCode);
// 			return attemptAuthCode;
// 		} else getAuthCode();
// 	}
