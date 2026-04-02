import asyncio
from playwright.async_api import async_playwright
import os

async def verify_portfolio():
    async with async_playwright() as p:
        # Launch browser
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()

        # Get the absolute path to index.html
        file_path = f"file://{os.getcwd()}/index.html"

        # 1. Verify Desktop Light Mode (Default)
        await page.goto(file_path)
        await page.set_viewport_size({"width": 1280, "height": 800})
        await page.wait_for_timeout(1000) # Wait for animations
        await page.screenshot(path="/home/jules/verification/desktop_light.png", full_page=True)

        # 2. Verify Desktop Dark Mode
        await page.click("#theme-toggle")
        await page.wait_for_timeout(500)
        await page.screenshot(path="/home/jules/verification/desktop_dark.png", full_page=True)

        # 3. Verify Mobile View & Menu
        await page.set_viewport_size({"width": 375, "height": 667}) # iPhone SE size
        await page.goto(file_path) # Reload to reset state
        await page.wait_for_timeout(1000)

        # Take mobile closed menu screenshot
        await page.screenshot(path="/home/jules/verification/mobile_closed.png")

        # Open mobile menu
        await page.click("#mobile-menu-btn")
        await page.wait_for_timeout(500)
        await page.screenshot(path="/home/jules/verification/mobile_menu_open.png")

        await browser.close()

if __name__ == "__main__":
    os.makedirs("/home/jules/verification", exist_ok=True)
    asyncio.run(verify_portfolio())
