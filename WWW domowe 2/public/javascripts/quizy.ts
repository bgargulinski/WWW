const buttons = document.getElementsByTagName('button')
for(let i=0;i<buttons.length;i++) {
    buttons[i].onclick = () => { location.href = '/quiz?id='+buttons[i].id }
}

