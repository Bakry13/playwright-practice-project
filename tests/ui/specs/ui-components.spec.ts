import { test, expect } from '@playwright/test';

test.describe('Dealing with UI Components', ()=> {
    test('drop down list', async ({page}) => {
        await page.goto('https://practice.expandtesting.com/dropdown');
        //1- label
        // await page.locator('#country').selectOption({label: 'Egypt'});
        //2- displayed text
        // await page.locator('#country').selectOption('Egypt');
        //3-value
        // await page.locator('#country').selectOption('EG');
        //4- index
        await page.locator('#country').selectOption({index: 3});
        //5- another way
        // await page.selectOption('#country', {label: 'Egypt'});
        // await page.selectOption('#country', {index: 3});
        // await page.selectOption('#country', 'EG');

        //Assertion
        //1- list count approach1
        const options = await page.locator('#country').locator('option');
        await expect(options).toHaveCount(252);
        //2- list count approach2
        const optionsCount = await page.$$('#country option');
        await expect(optionsCount).toHaveLength(252);
        await expect(optionsCount.length).toBe(252);
        //3- text content approach1
        const textContent = await page.locator('#country').textContent();
        await expect(textContent).toContain('Egypt');
        //4- text content approach2
        const textContent2 = await page.locator('#country').innerText();
        await expect(textContent2?.includes('Egypt')).toBeTruthy();
        //5- using loop (text content approach3)
        let status=false;
        for (const option of optionsCount) {
            const text = await option.innerText();
            console.log(text);
            if(text === 'Egypt'){
                status=true;
                break;
            }
        }
        await expect(status).toBeTruthy();
    });

    test('date picker - calender', async ({page}) => {
        await page.goto('https://demo.automationtesting.in/Datepicker.html');
        await page.locator('#datepicker1').click();
        await page.locator('.ui-icon.ui-icon-circle-triangle-e').click();
        await page.getByText('17').click();

        //second date picker
        const year = '2026'
        const month = 4;
        const day = '17';
        await page.locator('#datepicker2').click();
        await page.locator("select[title='Change the month']").selectOption({index: month-1});
        await page.locator("select[title='Change the year']").selectOption(year);
        await page.getByText(day).click();
    });

    test('iFrame', async ({page}) => {
        await page.goto('https://demo.automationtesting.in/Frames.html');
        //number of iframes in the page
        // const frames = await page.frames();
        // console.log("number of frames: ", frames.length);
        //1- switch to iframe by name
        // const frame = await page.frame('SingleFrame');
        // await frame?.locator("//input[@type='text']").fill('select iframe by name');
        //2- switch to iframe by url
        // const frame = await page.frame({url: 'https://demo.automationtesting.in/SingleFrame.html'});
        // await frame?.fill("//input[@type='text']", 'select iframe by url');
        //3- switch to iframe by locator
        // const frame = await page.frameLocator('#singleframe');
        // await frame.locator("//input[@type='text']").fill('select iframe by locator');

        //nested iframes
        //1- select by locator
        await page.locator(".analystic[href='#Multiple']").click();
        // const parentFrame = await page.frameLocator("//iframe[@src='MultipleFrames.html']");
        // const childFrame = await parentFrame.frameLocator("iframe[src='SingleFrame.html']");
        // await childFrame.locator("//input[@type='text']").fill('nested iframes with locator');
        //2- select by childFrame method
        const parentFrame = await page.frame({url: 'https://demo.automationtesting.in/MultipleFrames.html'});
        const childFrames = await parentFrame?.childFrames();
        await childFrames?.[0].locator("//input[@type='text']").fill('nested iframes with childFrames');
        });
        
    test('slider', async ({page}) => {
        await page.goto('https://practice.expandtesting.com/horizontal-slider');
        const sliderLocator = page.locator("//input[@max='5.0']");
        await sliderLocator.evaluate(e => {
            e.setAttribute('value', '3.5');
        })
        await page.pause();
    });

            
    test('Alerts', async ({page}) => {
        await page.goto('https://testautomationpractice.blogspot.com/');
        //1- alert
        // await page.on('dialog', async dialog => {
        //     await expect(dialog.message()).toContain('I am an alert box!');
        //     await dialog.accept();
        // });
        // await page.locator("#alertBtn").click();
        //2- confirm
        // await page.on('dialog', async dialog => {
        //     await expect(dialog.message()).toContain('Press a button!');
        //     await dialog.dismiss();
        // });
        // await page.locator("#confirmBtn").click();
        // await expect(page.locator("#demo")).toContainText('You pressed Cancel!');
        //3- prompt
        await page.on('dialog', async dialog => {
            await expect(dialog.message()).toContain('Please enter your name:');
            await expect(dialog.defaultValue()).toContain('Harry Potter');
            await dialog.accept('Mohamed Bakry');
        });
        await page.locator("#promptBtn").click();
        await expect(page.locator("#demo")).toContainText('Hello Mohamed Bakry! How are you today?');
    });
});