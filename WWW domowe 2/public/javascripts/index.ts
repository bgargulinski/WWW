const login = document.getElementById("login") as HTMLButtonElement
if(login !== null) login.onclick = () => {location.href="/login"}

const logout = document.getElementById("logout") as HTMLButtonElement
if(logout !== null) logout.onclick = () => {location.href="/logout"}

const quizy = document.getElementById("quizy") as HTMLButtonElement
if(quizy !== null) quizy.onclick = () => {location.href="/quizy"}

const repass = document.getElementById("repass") as HTMLButtonElement
if(repass !== null) repass.onclick = () => {location.href="/repass"}