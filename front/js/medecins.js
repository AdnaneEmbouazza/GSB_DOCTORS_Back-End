/**
 * Crée une icône SVG pour bâtiment
 */
function createBuildingIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>`;
}

/**
 * Crée une icône SVG pour téléphone
 */
function createPhoneIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>`;
}

/**
 * Crée une icône SVG pour stéthoscope
 */
function createStethoscopeIcon() {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-svg">
        <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path>
        <path d="M12 12c0 3-1 5-3 5s-3-2-3-5"></path>
        <circle cx="12" cy="17" r="1"></circle>
    </svg>`;
}

/**
 * Logique d'affichage et pagination des médecins
 */

import { fetchMedecins } from './api.js';

// Configuration
const MEDECINS_PAR_PAGE = 50;
let allMedecins = [];
let currentPage = 1;
let totalPages = 1;
let isUserAuthenticated = false;
let isSearching = false;
let searchResults = [];

// Éléments DOM
const medecinsList = document.getElementById('medecins-list');
const firstBtn = document.getElementById('first-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const lastBtn = document.getElementById('last-btn');
const pageInfo = document.getElementById('page-info');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const searchInput = document.getElementById('search-input');
const clearSearchBtn = document.getElementById('clear-search-btn');

/**
 * Charge tous les médecins depuis l'API
 */
async function loadMedecins() {
    try {
        loadingDiv.style.display = 'block';
        errorDiv.style.display = 'none';
        
        // Vérifier l'authentification
        isUserAuthenticated = await checkAuthStatus();
        
        allMedecins = await fetchMedecins();
        
        // Calculer le nombre total de pages
        totalPages = Math.ceil(allMedecins.length / MEDECINS_PAR_PAGE);
        
        // Afficher la première page
        currentPage = 1;
        displayPage();
        
        loadingDiv.style.display = 'none';
    } catch (error) {
        loadingDiv.style.display = 'none';
        errorDiv.style.display = 'block';
        errorDiv.textContent = `Erreur lors du chargement des médecins: ${error.message}`;
        console.error(error);
    }
}

/**
 * Affiche la page courante
 */
function displayPage() {
    // Choisir les données à afficher (recherche ou liste complète)
    const dataToDisplay = isSearching ? searchResults : allMedecins;
    
    // Calculer les indices
    const startIndex = (currentPage - 1) * MEDECINS_PAR_PAGE;
    const endIndex = startIndex + MEDECINS_PAR_PAGE;
    
    // Récupérer les médecins de cette page
    const medecinsDeLaPage = dataToDisplay.slice(startIndex, endIndex);
    
    // Vider et remplir la liste
    medecinsList.innerHTML = '';
    
    if (medecinsDeLaPage.length === 0) {
        medecinsList.innerHTML = '<p>Aucun médecin trouvé</p>';
        return;
    }
    
    medecinsDeLaPage.forEach(medecin => {
        const card = createMedecinCard(medecin);
        medecinsList.appendChild(card);
    });
    
    // Mettre à jour les infos de pagination
    pageInfo.textContent = `Page ${currentPage} / ${totalPages}`;
    
    // Désactiver les boutons si nécessaire
    firstBtn.disabled = currentPage === 1;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    lastBtn.disabled = currentPage === totalPages;
}

/**
 * Crée une card pour un médecin
 * @param {Object} medecin - Les données du médecin
 * @returns {HTMLElement} L'élément card
 */
function createMedecinCard(medecin) {
    const card = document.createElement('div');
    card.className = 'medecin-card';
    
    const nom = `${(medecin.prenom || '').trim()} ${(medecin.nom || '').trim()}`.trim();
    
    card.innerHTML = `
        <div class="medecin-header">
            <h3>${nom}</h3>
        </div>
        <div class="medecin-body">
            ${medecin.adresse ? `
                <div class="medecin-info">
                    <span class="icon-wrapper">${createBuildingIcon()}</span>
                    <span>${medecin.adresse}</span>
                </div>
            ` : ''}
            ${medecin.tel ? `
                <div class="medecin-info">
                    <span class="icon-wrapper">${createPhoneIcon()}</span>
                    <span>${medecin.tel}</span>
                </div>
            ` : ''}
            ${medecin.specialitecomplementaire ? `
                <div class="medecin-info">
                    <span class="icon-wrapper">${createStethoscopeIcon()}</span>
                    <span>${medecin.specialitecomplementaire}</span>
                </div>
            ` : ''}
            ${isUserAuthenticated ? `<a href="medecin-detail.html?id=${medecin.id}" class="btn-detail">Voir détails</a>` : ''}
        </div>
    `;
    
    return card;
}

/**
 * Gère le clic sur le bouton précédent
 */
function handlePrevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayPage();
        window.scrollTo(0, 0);
    }
}

/**
 * Gère le clic sur le bouton suivant
 */
function handleNextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        displayPage();
        window.scrollTo(0, 0);
    }
}

/**
 * Gère le clic sur le bouton première page
 */
function handleFirstPage() {
    if (currentPage !== 1) {
        currentPage = 1;
        displayPage();
        window.scrollTo(0, 0);
    }
}

/**
 * Gère le clic sur le bouton dernière page
 */
function handleLastPage() {
    if (currentPage !== totalPages) {
        currentPage = totalPages;
        displayPage();
        window.scrollTo(0, 0);
    }
}

/**
 * Recherche des médecins par nom/prénom
 */
async function searchMedecins(searchTerm) {
    if (!searchTerm.trim()) {
        // Si le champ est vide, retourner à la liste complète
        isSearching = false;
        searchResults = [];
        clearSearchBtn.style.display = 'none';
        currentPage = 1;
        displayPage();
        return;
    }

    try {
        loadingDiv.style.display = 'block';
        errorDiv.style.display = 'none';

        const response = await fetch(`http://localhost:3000/api/medecins/search?search=${encodeURIComponent(searchTerm)}`);
        
        if (!response.ok) {
            throw new Error('Erreur lors de la recherche');
        }

        searchResults = await response.json();
        isSearching = true;
        clearSearchBtn.style.display = 'block';
        
        // Réinitialiser la pagination et afficher les résultats
        currentPage = 1;
        totalPages = Math.ceil(searchResults.length / MEDECINS_PAR_PAGE);
        displayPage();
        
        loadingDiv.style.display = 'none';
    } catch (error) {
        loadingDiv.style.display = 'none';
        errorDiv.style.display = 'block';
        errorDiv.textContent = `Erreur lors de la recherche: ${error.message}`;
        console.error(error);
    }
}

/**
 * Gère les changements du champ de recherche
 */
function handleSearchInput(e) {
    const searchTerm = e.target.value.trim();
    searchMedecins(searchTerm);
}

/**
 * Réinitialise la recherche
 */
function handleClearSearch() {
    searchInput.value = '';
    isSearching = false;
    searchResults = [];
    clearSearchBtn.style.display = 'none';
    currentPage = 1;
    totalPages = Math.ceil(allMedecins.length / MEDECINS_PAR_PAGE);
    displayPage();
}

/**
 * Affiche la page courante (modifiée pour gérer les résultats de recherche)
 */

/**
 * Initialise l'application
 */
function init() {
    // Ajouter les event listeners de pagination
    firstBtn.addEventListener('click', handleFirstPage);
    prevBtn.addEventListener('click', handlePrevPage);
    nextBtn.addEventListener('click', handleNextPage);
    lastBtn.addEventListener('click', handleLastPage);
    
    // Ajouter les event listeners de recherche
    searchInput.addEventListener('input', handleSearchInput);
    clearSearchBtn.addEventListener('click', handleClearSearch);
    
    // Charger les médecins
    loadMedecins();
}

// Lancer l'app au chargement du DOM
document.addEventListener('DOMContentLoaded', init);
