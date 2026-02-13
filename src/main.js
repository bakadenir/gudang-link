import "./style.css";

const url = "https://v1.appbackend.io/v1/rows/sy6Gh2PvGG3W";

const kotakJudul = document.querySelector("#input-judul");
const kotakUrl = document.querySelector("#input-url");
const tombolSimpan = document.querySelector("#tombol-simpan");
const tempatDaftar = document.querySelector("#daftar-link");

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function main() {
  const response = await getData();
  const semuaData = response.data || [];

  if (semuaData.length === 0) {
    const info = document.createElement("p");
    info.textContent = "Belum ada link tersimpan.";
    info.style.textAlign = "center";
    info.style.color = "#888";
    tempatDaftar.append(info);
    return;
  }

  semuaData.forEach((link) => {
    const card = document.createElement("div");
    card.className = "card";

    const judulEl = document.createElement("span");
    judulEl.className = "judul-link";
    judulEl.textContent = link.judul;

    const urlEl = document.createElement("span");
    urlEl.className = "isi-url";
    urlEl.textContent = link.url;

    card.append(judulEl, urlEl);
    tempatDaftar.append(card);
  });
}

tombolSimpan.addEventListener("click", async () => {
  const judulValue = kotakJudul.value;
  const urlValue = kotakUrl.value;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{ judul: judulValue, url: urlValue }]),
  });

  window.location.reload();
});

main();
