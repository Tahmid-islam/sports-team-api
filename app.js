const loadData = async (url, check) => {
  const response = await fetch(url);
  if (response.status == 200) {
    document.getElementById("spinner").style.display = "none";
  }
  const data = await response.json();
  if (check) {
    showTeams(data);
  } else if (check == false) {
    showDetails(data);
  }
};

document.getElementById("button").addEventListener("click", () => {
  const input = document.getElementById("search-input");
  const searchItem = input.value;
  if (searchItem == "") {
    alert("Please enter a team name");
  } else {
    document.getElementById("spinner").style.display = "block";
    const url = `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${searchItem}`;
    loadData(url, true);
  }
  input.value = "";
});

function showTeams(data) {
  const teams = data.teams;
  const row = document.getElementById("row");
  row.textContent = "";
  teams.forEach((team) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="col">
    <div class="card">
      <img src="${team.strTeamBadge}" class="card-img-top img-fluid" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${team.strTeam}</h5>
        <p class="card-text">
        <span class="fw-bold">Formed Year:</span>${team.intFormedYear}</br>
         <span class="fw-bold">Stadium Name:</span>${team.strStadium}</br>
         <span class="fw-bold">Major Playing League:</span> ${team.strLeague}</br></br>
         <button class="btn btn-primary btn-sm" data-bs-toggle="offcanvas"
         data-bs-target="#offcanvasExample"
         aria-controls="offcanvasExample" onClick=showDetailsButton(${team.idTeam})>Show Details</button>
        </p>
      </div>
    </div>
  </div>
    `;
    row.appendChild(div);
  });
}

const showDetailsButton = (teamId) => {
  const url = `https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamId}`;
  loadData(url, false);
};

const showDetails = (data) => {
  const details = data.teams[0];
  const { strTeam, strDescriptionEN, strWebsite } = details;
  const team = document.getElementById("offcanvasExample");
  team.innerHTML = `
  <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">
               ${strTeam}
            </h5>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <div>
             ${strDescriptionEN}
            </div>
            <div><p>Website: <a href="http://${strWebsite}" target="_blank">Click Here</a> </p></div>
          </div>
        </div>
  `;
};
