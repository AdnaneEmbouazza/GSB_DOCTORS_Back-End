// Charger les InfoS du compte du visiteur et les afficher

let visiteurData = null; // Stocker les données pour les utiliser ensuite
let currentRapportId = null; // Stocker l'ID du rapport en cours de modification
let filteredRapports = null; // Stocker les rapports filtrés par date
let isFiltering = false; // Indiquer si on affiche des résultats filtrés

async function loadAccountInfo() {
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const content = document.getElementById('content');
    
    loading.style.display = 'block';
    
    try {
        const response = await fetch('http://localhost:3000/api/visiteurs/account', {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
            throw new Error('Accès non autorisé. Veuillez vous reconnecter.');
        }
        
        const data = await response.json();
        visiteurData = data; // Stocker les données
        
        // Remplir les champs
        document.getElementById('field-login').textContent = data.login || '-';
        document.getElementById('field-nom').textContent = data.nom || '-';
        document.getElementById('field-prenom').textContent = data.prenom || '-';
        document.getElementById('field-adresse').textContent = data.adresse || '-';
        document.getElementById('field-cp').textContent = data.cp || '-';
        document.getElementById('field-ville').textContent = data.ville || '-';
        
        // Formatter la date d'embauche - attention: l'API retourne "dateembauche" en minuscules
        if (data.dateembauche) {
            const date = new Date(data.dateembauche);
            const formattedDate = date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
            document.getElementById('field-dateEmbauche').textContent = formattedDate;
        }
        
        loading.style.display = 'none';
        content.style.display = 'block';
        
    } catch (err) {
        console.error('Erreur:', err);
        loading.style.display = 'none';
        error.style.display = 'block';
        error.textContent = err.message || 'Erreur lors du chargement du compte';
    }
}

function displayReports() {
    const reportsList = document.getElementById('reports-list');
    const reportsSection = document.getElementById('reports-section');
    
    // Utiliser les rapports filtrés ou tous les rapports
    const rapportsToDisplay = isFiltering && filteredRapports ? filteredRapports : (visiteurData?.rapport || []);
    
    if (rapportsToDisplay.length === 0) {
        reportsList.innerHTML = '<p style="text-align: center; color: #999;">Aucun rapport disponible</p>';
        reportsSection.style.display = 'block';
        return;
    }
    
    // Créer le tableau des rapports
    let html = '<table class="reports-table"><thead><tr>';
    html += '<th>Date</th>';
    html += '<th>Motif</th>';
    html += '<th>Bilan</th>';
    html += '<th>Médecin</th>';
    html += '<th>Actions</th>';
    html += '</tr></thead><tbody>';
    
    rapportsToDisplay.forEach(rapport => {
        const date = new Date(rapport.date);
        const formattedDate = date.toLocaleDateString('fr-FR');
        
        html += '<tr>';
        html += `<td>${formattedDate}</td>`;
        html += `<td>${rapport.motif || '-'}</td>`;
        html += `<td>${rapport.bilan || '-'}</td>`;
        html += `<td>${rapport.idmedecin || '-'}</td>`;
        html += `<td class="actions-cell">`;
        html += `<button class="btn-edit" data-id="${rapport.id}">Modifier</button>`;
        html += `<button class="btn-delete" data-id="${rapport.id}">Supprimer</button>`;
        html += `</td>`;
        html += '</tr>';
    });
    
    html += '</tbody></table>';
    
    reportsList.innerHTML = html;
    reportsSection.style.display = 'block';
    
    // Ajouter les écouteurs aux boutons
    addReportButtonListeners();
}

function addReportButtonListeners() {
    // Boutons Modifier
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const rapportId = parseInt(e.target.dataset.id);
            openEditModal(rapportId);
        });
    });
    
    // Boutons Supprimer
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const rapportId = parseInt(e.target.dataset.id);
            deleteRapport(rapportId);
        });
    });
}

function openEditModal(rapportId) {
    const rapport = visiteurData.rapport.find(r => r.id === rapportId);
    if (!rapport) return;
    
    currentRapportId = rapportId;
    
    // Pré-remplir le formulaire
    const date = new Date(rapport.date);
    const dateStr = date.toISOString().split('T')[0];
    
    document.getElementById('edit-rapport-date').value = dateStr;
    document.getElementById('edit-rapport-motif').value = rapport.motif || '';
    document.getElementById('edit-rapport-bilan').value = rapport.bilan || '';
    document.getElementById('edit-rapport-error').style.display = 'none';
    
    // Afficher la modale
    document.getElementById('edit-rapport-modal').style.display = 'flex';
}

function closeEditModal() {
    document.getElementById('edit-rapport-modal').style.display = 'none';
    currentRapportId = null;
}

async function submitEditForm(e) {
    e.preventDefault();
    
    if (!currentRapportId) return;
    
    const date = document.getElementById('edit-rapport-date').value;
    const motif = document.getElementById('edit-rapport-motif').value;
    const bilan = document.getElementById('edit-rapport-bilan').value;
    const errorDiv = document.getElementById('edit-rapport-error');
    
    try {
        const response = await fetch(`http://localhost:3000/api/rapport/${currentRapportId}`, {
            method: 'PUT',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                date: new Date(date).toISOString(),
                motif, 
                bilan
            })
        });
        
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Erreur lors de la modification');
        }
        
        // Recharger les infos et fermer la modale
        await loadAccountInfo();
        closeEditModal();
        displayReports();
        
    } catch (err) {
        console.error('Erreur:', err);
        errorDiv.textContent = err.message;
        errorDiv.style.display = 'block';
    }
}

async function deleteRapport(rapportId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce rapport ?')) {
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/api/rapport/${rapportId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Erreur lors de la suppression');
        }
        
        // Recharger les infos et rafraîchir l'affichage
        await loadAccountInfo();
        clearDateFilter(); // Réinitialiser le filtre après suppression
        displayReports();
        
    } catch (err) {
        console.error('Erreur:', err);
        alert('Erreur: ' + err.message);
    }
}

/**
 * Recherche les rapports du visiteur connecté pour une date spécifique
 */
async function searchRapportsByDate() {
    const filterDate = document.getElementById('filter-date').value;
    
    if (!filterDate) {
        alert('Veuillez sélectionner une date');
        return;
    }
    
    try {
        const response = await fetch(`http://localhost:3000/api/rapports/date?date=${filterDate}`, {
            method: 'GET',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Erreur lors de la recherche');
        }
        
        filteredRapports = await response.json();
        isFiltering = true;
        document.getElementById('clear-filter-btn').style.display = 'block';
        
        displayReports();
        
    } catch (err) {
        console.error('Erreur:', err);
        alert('Erreur: ' + err.message);
    }
}

/**
 * Réinitialise le filtre et affiche tous les rapports
 */
function clearDateFilter() {
    filteredRapports = null;
    isFiltering = false;
    document.getElementById('filter-date').value = '';
    document.getElementById('clear-filter-btn').style.display = 'none';
    displayReports();
}

document.addEventListener('DOMContentLoaded', () => {
    loadAccountInfo();
    
    const showReportsBtn = document.getElementById('show-reports-btn');
    const hideReportsBtn = document.getElementById('hide-reports-btn');
    const reportsSection = document.getElementById('reports-section');
    const editForm = document.getElementById('edit-rapport-form');
    const modalCloseBtn = document.getElementById('modal-close-edit');
    const modalCancelBtn = document.getElementById('modal-cancel-edit');
    const editModal = document.getElementById('edit-rapport-modal');
    const filterBtn = document.getElementById('filter-btn');
    const clearFilterBtn = document.getElementById('clear-filter-btn');
    
    if (showReportsBtn) {
        showReportsBtn.addEventListener('click', displayReports);
    }
    
    if (hideReportsBtn) {
        hideReportsBtn.addEventListener('click', () => {
            reportsSection.style.display = 'none';
        });
    }
    
    if (editForm) {
        editForm.addEventListener('submit', submitEditForm);
    }
    
    if (filterBtn) {
        filterBtn.addEventListener('click', searchRapportsByDate);
    }
    
    if (clearFilterBtn) {
        clearFilterBtn.addEventListener('click', clearDateFilter);
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeEditModal);
    }
    
    if (modalCancelBtn) {
        modalCancelBtn.addEventListener('click', closeEditModal);
    }
    
    // Fermer la modale en cliquant en dehors
    if (editModal) {
        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) {
                closeEditModal();
            }
        });
    }
});
