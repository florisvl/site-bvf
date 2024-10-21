// URLs van de gehoste JSON-bestanden op GitHub voor beide tabellen
const jsonUrlTable1 = "https://raw.githubusercontent.com/florisvl/airtable-json-export/main/data-table1.json";
const jsonUrlTable2 = "https://raw.githubusercontent.com/florisvl/airtable-json-export/main/data-table2.json";

// Functie om data op te halen van Tabel 1 en weer te geven
async function fetchDataTable1() {
    try {
        const response = await fetch(jsonUrlTable1);
        if (!response.ok) {
            throw new Error('Error: ' + response.status);
        }
        const data = await response.json();
        displayDataTable1(data.records);
    } catch (error) {
        console.error('Fout bij het ophalen van de data van Tabel 1:', error);
    }
}

// Functie om data op te halen van Tabel 2 en weer te geven
async function fetchDataTable2() {
    try {
        const response = await fetch(jsonUrlTable2);
        if (!response.ok) {
            throw new Error('Error: ' + response.status);
        }
        const data = await response.json();
        displayDataTable2(data.records);
    } catch (error) {
        console.error('Fout bij het ophalen van de data van Tabel 2:', error);
    }
}

// Functie om data van Tabel 1 weer te geven
function displayDataTable1(records) {
    const outputDiv = document.getElementById('data-output-table1');
    outputDiv.innerHTML = ''; // Maak de div leeg

    records.forEach(record => {
        const dataItem = document.createElement('div');
        dataItem.className = 'data-item';
        dataItem.innerHTML = `
            <h3>${record.fields["Waarvoor is de donatie"]}</h3>
            <p><strong>Description:</strong> ${record.fields.Dontatie}</p>
        `;
        outputDiv.appendChild(dataItem);
    });
}

// Functie om data op te halen en in specifieke HTML-elementen te tonen
async function fetchData() {
    try {
        const response = await fetch(jsonUrlTable2);
        if (!response.ok) {
            throw new Error('Error: ' + response.status);
        }
        const data = await response.json();

        // Specifieke data uit het JSON-object ophalen
        const firstRecord = data.records[0];  // Haal het eerste record op
        const bedrijf_stichting = firstRecord.fields["Bedrijf/stichting"];
        const over_bedrijf_stichting = firstRecord.fields["Over het doel of project"];
        const logo_bedrijf_stichting = firstRecord.fields["Logo"][0].url;

        console.log(logo_bedrijf_stichting); 

        // Plaats de data in de specifieke HTML-elementen
        document.getElementById('bedrijf_stichting').textContent = bedrijf_stichting;
        document.getElementById('over_bedrijf_stichting').textContent = over_bedrijf_stichting;
        document.getElementById('logo_bedrijf_stichting').src = logo_bedrijf_stichting;

    } catch (error) {
        console.error('Fout bij het ophalen van de data:', error);
    }
}


// Functie om data van Tabel 2 weer te geven
function displayDataTable2(records) {
    const outputDiv = document.getElementById('data-output-table2');
    outputDiv.innerHTML = ''; // Maak de div leeg

    records.forEach(record => {
        const dataItem = document.createElement('div');
        dataItem.className = 'data-item';
        dataItem.innerHTML = `
            <h3>${record.fields["Bedrijf/stichting"]}</h3>
            <p><strong>Details:</strong> ${record.fields["Over het doel of project"]}</p>
            <img src="${record.fields["Logo"][0].url}" alt="${record.fields["Bedrijf/stichting"]}" style="max-width: 200px;"/>
        `;
        outputDiv.appendChild(dataItem);
    });
}

// Haal data op voor beide tabellen zodra de pagina geladen is
window.onload = () => {
    fetchDataTable1(); // Haal gegevens op van Tabel 1
    fetchDataTable2(); // Haal gegevens op van Tabel 2
    fetchData();
};