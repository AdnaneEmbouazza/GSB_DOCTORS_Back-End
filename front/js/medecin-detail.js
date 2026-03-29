// Charger les détails du médecin et ses rapports

let medecinData = null;

// Récupérer l'ID du médecin depuis l'URL
function getMedecinIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

async function loadMedecinDetails() {
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const content = document.getElementById('content');
    
    const medecinId = getMedecinIdFromUrl();
    
    if (!medecinId) {
        error.textContent = 'Identifiant du médecin invalide';
        error.style.display = 'block';
        return;
    }
    
    loading.style.display = 'block';
    
    try {
        // Vérifier l'authentification et afficher le bouton si connecté
        const isAuthenticated = await checkAuthStatus();
        if (isAuthenticated) {
            document.getElementById('create-rapport-btn').style.display = 'block';
        }
        
        const response = await fetch(`http://localhost:3000/api/medecin/${medecinId}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
            throw new Error('Médecin non trouvé ou accès non autorisé');
        }
        
        const data = await response.json();
        medecinData = data;
        
        // Remplir les champs
        document.getElementById('field-nom').textContent = `${data.prenom || ''} ${data.nom || ''}`.trim();
        document.getElementById('field-prenom').textContent = data.prenom || '-';
        document.getElementById('field-adresse').textContent = data.adresse || '-';
        document.getElementById('field-tel').textContent = data.tel || '-';
        document.getElementById('field-departement').textContent = data.departement || '-';
        document.getElementById('field-specialite').textContent = data.specialitecomplementaire || 'Généraliste';
        
        loading.style.display = 'none';
        content.style.display = 'block';
        
    } catch (err) {
        console.error('Erreur:', err);
        loading.style.display = 'none';
        error.style.display = 'block';
        error.textContent = err.message || 'Erreur lors du chargement du médecin';
    }
}

function displayRapports() {
    const rapportsList = document.getElementById('rapports-list');
    const rapportsSection = document.getElementById('rapports-section');
    
    if (!medecinData || !medecinData.rapport || medecinData.rapport.length === 0) {
        rapportsList.innerHTML = '<p style="text-align: center; color: #999;">Aucun rapport disponible pour ce médecin</p>';
        rapportsSection.style.display = 'block';
        return;
    }
    
    // Créer le tableau des rapports
    let html = '<table class="reports-table"><thead><tr>';
    html += '<th>Date</th>';
    html += '<th>Motif</th>';
    html += '<th>Bilan</th>';
    html += '<th>Visiteur</th>';
    html += '</tr></thead><tbody>';
    
    medecinData.rapport.forEach(rapport => {
        const date = new Date(rapport.date);
        const formattedDate = date.toLocaleDateString('fr-FR');
        
        html += '<tr>';
        html += `<td>${formattedDate}</td>`;
        html += `<td>${rapport.motif || '-'}</td>`;
        html += `<td>${rapport.bilan || '-'}</td>`;
        html += `<td>${rapport.idvisiteur || '-'}</td>`;
        html += '</tr>';
    });
    
    html += '</tbody></table>';
    
    rapportsList.innerHTML = html;
    rapportsSection.style.display = 'block';
}

async function openCreateRapportModal() {
    // Vérifier l'authentification avant d'ouvrir la modale
    const isAuthenticated = await checkAuthStatus();
    if (!isAuthenticated) {
        alert('Vous devez être connecté pour créer un rapport');
        return;
    }
    
    // Réinitialiser le formulaire
    document.getElementById('create-rapport-form').reset();
    document.getElementById('create-rapport-error').style.display = 'none';
    document.getElementById('create-rapport-success').style.display = 'none';
    document.getElementById('rapport-date').valueAsDate = new Date();
    
    // Afficher la modale
    document.getElementById('create-rapport-modal').style.display = 'flex';
}

function closeCreateRapportModal() {
    document.getElementById('create-rapport-modal').style.display = 'none';
}

async function submitCreateRapportForm(e) {
    e.preventDefault();
    
    if (!medecinData) return;
    
    const date = document.getElementById('rapport-date').value;
    const motif = document.getElementById('rapport-motif').value;
    const bilan = document.getElementById('rapport-bilan').value;
    const errorDiv = document.getElementById('create-rapport-error');
    const successDiv = document.getElementById('create-rapport-success');
    
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
    
    try {
        const response = await fetch('http://localhost:3000/api/rapport', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                date: new Date(date).toISOString(),
                motif,
                bilan,
                idmedecin: medecinData.id
            })
        });
        
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Erreur lors de la création du rapport');
        }
        
        // Succès
        successDiv.textContent = 'Rapport créé avec succès!';
        successDiv.style.display = 'block';
        
        // Recharger les données du médecin et fermer la modale
        setTimeout(() => {
            loadMedecinDetails();
            closeCreateRapportModal();
        }, 1500);
        
    } catch (err) {
        console.error('Erreur:', err);
        errorDiv.textContent = err.message;
        errorDiv.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadMedecinDetails();
    
    const createRapportBtn = document.getElementById('create-rapport-btn');
    const showRapportsBtn = document.getElementById('show-rapports-btn');
    const hideRapportsBtn = document.getElementById('hide-rapports-btn');
    const rapportsSection = document.getElementById('rapports-section');
    const createRapportForm = document.getElementById('create-rapport-form');
    const modalCloseBtn = document.getElementById('modal-close-rapport');
    const modalCancelBtn = document.getElementById('modal-cancel-rapport');
    const createRapportModal = document.getElementById('create-rapport-modal');
    
    if (createRapportBtn) {
        createRapportBtn.addEventListener('click', openCreateRapportModal);
    }
    
    if (showRapportsBtn) {
        showRapportsBtn.addEventListener('click', displayRapports);
    }
    
    if (hideRapportsBtn) {
        hideRapportsBtn.addEventListener('click', () => {
            rapportsSection.style.display = 'none';
        });
    }
    
    if (createRapportForm) {
        createRapportForm.addEventListener('submit', submitCreateRapportForm);
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeCreateRapportModal);
    }
    
    if (modalCancelBtn) {
        modalCancelBtn.addEventListener('click', closeCreateRapportModal);
    }
    
    // Fermer la modale en cliquant en dehors
    if (createRapportModal) {
        createRapportModal.addEventListener('click', (e) => {
            if (e.target === createRapportModal) {
                closeCreateRapportModal();
            }
        });
    }
});
