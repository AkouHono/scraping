from selenium import webdriver
from selenium.webdriver.common.by import By
import sys
import json

def scrape(url):
    # Setup Selenium WebDriver (use the appropriate driver for your browser)
    driver = webdriver.Chrome()  # You can also use Firefox or another driver
    
    # Navigate to the page
    driver.get(url)
    
    # Wait for the page to load (or use WebDriverWait for more advanced waits)
    driver.implicitly_wait(10)  # Wait for 10 seconds

    # Scrape data (e.g., all h2 elements)
    titles = [title.text for title in driver.find_elements(By.TAG_NAME, 'h2')]

    # Close the browser
    driver.quit()

    # Return the scraped data as JSON
    return json.dumps({"titles": titles})

if __name__ == "__main__":
    url = sys.argv[1]
    result = scrape(url)
    print(result)
