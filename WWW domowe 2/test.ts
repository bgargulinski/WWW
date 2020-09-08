import { expect } from 'chai';
import {Builder } from 'mocha-webdriver';


describe('test1', function () {

    it('test można zrobić raz', async function() {
        this.timeout(25000)
        const driver = await new Builder().forBrowser('firefox').build();
        //logowanie
        await driver.get('http://localhost:3000/login');
        await driver.find('input[name=login]').sendKeys('user1');
        await driver.find('input[name=password]').sendKeys('user1');
        await driver.find('input[type=submit]').doClick();
        //pierwsza próba zrobienia testu
        await driver.get('http://localhost:3000/pytanie?id=1000');
        await driver.sleep(1000);
        //jesli się nie udało, to test był zrobiony
        if(await driver.getCurrentUrl() === 'http://localhost:3000/pytanie?id=1000') {
            //jeśli zaczęto quiz, robimy go
            for (let i = 0; i < 4; i++) {
                await driver.findElement({id: 'odp1'}).doClick();
                await driver.sleep(1000);
            }
            //zapisujemy quiz
            await driver.findElement({id: 'stop'}).doClick();
            //próba ponownego zrobienia quizu
            await driver.get('http://localhost:3000/pytanie?id=1000');
            await driver.sleep(1000);
            expect(await driver.getCurrentUrl()).to.not.equal('http://localhost:3000/pytanie?id=1000')
        }
        driver.close()
    });

    it('zmiana hasła', async function() {
        this.timeout(50000);
        const driver = await new Builder().forBrowser('firefox').build();
        const driver1 = await new Builder().forBrowser('firefox').build();
        //zalogowanie pierwszej sesji
        await driver1.get('http://localhost:3000/login');
        await driver1.find('input[name=login]').sendKeys('user1');
        await driver1.find('input[name=password]').sendKeys('user1');
        await driver1.find('input[type=submit]').doClick();
        await driver.sleep(2000);
        //zalogowanie drugiej sesji
        await driver.get('http://localhost:3000/login');
        await driver.sleep(2000);
        await driver.find('input[name=login]').sendKeys('user1');
        await driver.find('input[name=password]').sendKeys('user1');
        await driver.find('input[type=submit]').doClick();
        await driver.sleep(2000);
        //zmiana hasła
        await driver.get('http://localhost:3000/repass');
        await driver.find('input[name=password]').sendKeys('user1');
        await driver.find('input[type=submit]').doClick();
        //sprawdzenie czy wylogowano sesje
        await driver.get('http://localhost:3000/login');
        await driver.sleep(2000);
        await driver1.get('http://localhost:3000/login');
        await driver.sleep(2000);
        await driver.sleep(2000);
        expect(await driver.getCurrentUrl()).to.equal('http://localhost:3000/login')
        expect(await driver1.getCurrentUrl()).to.equal('http://localhost:3000/login')
        driver.close()
        driver1.close()
    });

})