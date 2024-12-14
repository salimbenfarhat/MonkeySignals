document.addEventListener('DOMContentLoaded', () => {
  const profileNameInput = document.getElementById('profile-name');
  const createProfileButton = document.getElementById('create-profile');
  const profileList = document.getElementById('profile-list');

  // Charger les profils existants
  loadProfiles();

  // Ajouter un profil
  createProfileButton.addEventListener('click', () => {
    const profileName = profileNameInput.value.trim();

    if (!profileName) {
      alert('Veuillez entrer un nom de profil.');
      return;
    }

    if (isProfileExists(profileName)) {
      alert('Ce nom de profil existe déjà.');
      return;
    }

    createProfile(profileName);
    profileNameInput.value = ''; // Réinitialiser le champ
  });

  // Charger les profils depuis le localStorage
  function loadProfiles() {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    profileList.innerHTML = '';

    profiles.forEach(profile => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${profile.name}</strong> <span>${profile.balance.toFixed(2)} USDT</span>
      `;
      profileList.appendChild(li);
    });
  }

  // Vérifier si un profil existe
  function isProfileExists(name) {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    return profiles.some(profile => profile.name === name);
  }

  // Créer un nouveau profil
  function createProfile(name) {
    const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
    profiles.push({ name, balance: 1000 });
    localStorage.setItem('profiles', JSON.stringify(profiles));
    loadProfiles();
    alert(`Profil "${name}" créé avec succès.`);
  }
});
