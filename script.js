const hotels = [
    "Stalwart Jajati",
    "Ann'Cafe",
    "Hotel Sutrupti",
    "Hotel Bandhan Inn",
    "Triumph Inn",
    "Dev's Garden",
    "Hotel Shirose",
    "The Bombai (BBSR)",
    "Bombai Cafe (CTC)"
  ];
  
  const tableBody = document.getElementById("table-body");
  const serviceData = JSON.parse(localStorage.getItem("services") || "{}");
  
  function saveToLocalStorage() {
    localStorage.setItem("services", JSON.stringify(serviceData));
  }
  
  function renderTable() {
    tableBody.innerHTML = "";
    hotels.forEach(hotel => {
      const count = serviceData[hotel]?.length || 0;
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${hotel}</td>
        <td><input type="date" id="date-${hotel}" /></td>
        <td><button onclick="submitDate('${hotel}')">Submit</button></td>
        <td id="count-${hotel}">${count}</td>
        <td><button onclick="downloadBill('${hotel}')">Download</button></td>
      `;
  
      tableBody.appendChild(row);
    });
  }
  
  function submitDate(hotel) {
    const dateInput = document.getElementById(`date-${hotel}`);
    const dateValue = dateInput.value;
    if (!dateValue) return alert("Please select a date.");
  
    if (!serviceData[hotel]) serviceData[hotel] = [];
    serviceData[hotel].push(dateValue);
    saveToLocalStorage();
    renderTable();
  }
  
  function downloadBill(hotel) {
    const dates = serviceData[hotel] || [];
    let content = `Hotel Name: ${hotel}\nService Dates:\n`;
    dates.forEach(date => {
      content += `- ${date}\n`;
    });
    const blob = new Blob([content], { type: "application/msword" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${hotel.replace(/\s+/g, '_')}_Service_Report.doc`;
    link.click();
  }
  
  renderTable();
  