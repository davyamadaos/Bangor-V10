import requests, zipfile, io, json
import pandas as pd

ZIP_URL = "https://epawebapp.epa.ie/Hydronet/output/internet/stations/CAS/33008/S/3_months.zip"
IMAGE_URL = "https://epawebapp.epa.ie/Hydronet/output/internet/stations/CAS/33008/S/extralarge_3m_extralarge.png"

r = requests.get(ZIP_URL, timeout=30)
z = zipfile.ZipFile(io.BytesIO(r.content))
csv_file = z.namelist()[0]

df = pd.read_csv(
    z.open(csv_file),
    comment="#",
    names=["timestamp","value","absolute","quality"]
)

df["timestamp"] = pd.to_datetime(df["timestamp"])
df = df.dropna()

df["gauge"] = ((16.921 * df["absolute"]) - 1675.7).round(1)

history = []
for _, row in df.iterrows():
    history.append({
        "time": row["timestamp"].isoformat(),
        "epa": round(float(row["absolute"]), 3),
        "gauge": round(float(row["gauge"]), 1),
        "actual": True
    })

with open("data/history.json","w") as f:
    json.dump(history, f)

with open("data/latest.json","w") as f:
    json.dump(history[-1], f)

img = requests.get(IMAGE_URL, timeout=30)
with open("data/chart.png","wb") as f:
    f.write(img.content)
