from flask import Flask, render_template
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import time

CHATGPT_API_NAME = "Myname=Faisal+Alhassan"
CHATGPT_API_KEY = "Bearer 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"
chatgpt_ai_endpoint = "https://api.openai.com/v1/chat/completions"

date = datetime.now()
date_string = date.strftime("%d-%m-%Y")
date_str_format = date_string.split()[0].split("-")
today = f"{date_str_format[0]}-{date_str_format[1]}-{date_str_format[2][2:]}"

URL = "https://www.graphic.com.gh/news/politics.html"
response = requests.get(URL)
soup = BeautifulSoup(response.text, "html.parser")

anchors_list = soup.select(selector="td a")
headlines_list = [{"title": item.getText().strip(), "link": item.get('href').strip()} for item in anchors_list]

dates = soup.find_all(name="td", class_="list-date")
dates_list = [date.getText().strip() for date in dates]

for i in range(len(dates_list)):
    headlines_list[i]["date"] = dates_list[i]

filtered_list = [item for item in headlines_list if item['date'] == today]


for item in filtered_list:
    response = requests.get(f"https://www.graphic.com.gh{item['link']}")
    soup = BeautifulSoup(response.text, "html.parser")
    report_text = soup.find_all(name="p")
    report = ""
    for line in report_text[2:-3]:
        report += line.getText()

    params = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": f"Summarize this text in 50 words: {report}"}]
    }

    headers = {
        "Authorization": CHATGPT_API_KEY
    }

    response = requests.post(url=chatgpt_ai_endpoint, stream=True, json=params, headers=headers)
    print(response)
    item["summary"] = response.json()["choices"][0]["message"]["content"]

    time.sleep(60)

app = Flask(__name__)


@app.route('/')
def home():
    return render_template("index.html", news_list=filtered_list)


if __name__ == "__main__":
    app.run(debug=True)


