/**
 * Clínica Vitta - Unified Dashboard Controller
 * Handles tab switching, search/filters, dynamic modals, slide-over drawers, and interactive status management.
 */

// Global State
let currentTab = 'dashboard';
let selectedAgendaDoctorFilter = 'todos';
let selectedSpecialtyFilter = 'todas';

// Tab Metadata Configurations
const tabConfig = {
    dashboard: {
        category: 'VISÃO GERAL',
        title: 'Olá, equipe Clínica Vitta',
        primaryAction: null,
        secondaryAction: null
    },
    agenda: {
        category: 'AGENDA DE CONSULTAS',
        title: 'Gestão de Agendamentos',
        primaryAction: {
            text: 'Novo Agendamento',
            icon: 'fa-plus',
            onclick: "openModal('modal-agendamento')"
        },
        secondaryAction: {
            text: 'Exportar',
            icon: 'fa-download',
            onclick: "exportSchedule()"
        }
    },
    pacientes: {
        category: 'GESTÃO DE PACIENTES',
        title: 'Base de Pacientes',
        primaryAction: {
            text: 'Novo Paciente',
            icon: 'fa-user-plus',
            onclick: "openPatientModal()"
        },
        secondaryAction: {
            text: 'Exportar Lista',
            icon: 'fa-file-export',
            onclick: "exportPatients()"
        }
    },
    profissionais: {
        category: 'CORPO CLÍNICO',
        title: 'Profissionais de Saúde',
        primaryAction: {
            text: 'Novo Profissional',
            icon: 'fa-user-plus',
            onclick: "openDoctorModal()"
        },
        secondaryAction: {
            text: 'Exportar Lista',
            icon: 'fa-file-export',
            onclick: "exportDoctors()"
        }
    },
    historico: {
        category: 'HISTÓRICO DE ATENDIMENTOS',
        title: 'Registro & Prontuários',
        primaryAction: {
            text: 'Filtro Avançado',
            icon: 'fa-filter',
            onclick: "showToast('Filtro por Período Aplicado!')"
        },
        secondaryAction: {
            text: 'Exportar Relatório',
            icon: 'fa-file-export',
            onclick: "exportHistory()"
        }
    }
};

// ============================================================
// TAB NAVIGATION SYSTEM
// ============================================================
function switchTab(tabId) {
    if (!tabConfig[tabId]) tabId = 'dashboard';
    currentTab = tabId;

    // Update active class on nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('data-tab') === tabId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Update active tab pane
    document.querySelectorAll('.tab-pane').forEach(pane => {
        if (pane.id === `tab-${tabId}`) {
            pane.classList.add('active');
        } else {
            pane.classList.remove('active');
        }
    });

    // Update Header Text & Actions
    const config = tabConfig[tabId];
    const catEl = document.getElementById('header-category-tag');
    const titleEl = document.getElementById('header-main-title');
    const actionsContainer = document.getElementById('dynamic-header-actions');

    if (catEl) catEl.innerText = config.category;
    if (titleEl) titleEl.innerText = config.title;

    if (actionsContainer) {
        let actionsHtml = '';
        if (config.secondaryAction) {
            actionsHtml += `
                <button class="btn-secondary" onclick="${config.secondaryAction.onclick}">
                    <i class="fa-solid ${config.secondaryAction.icon}"></i> ${config.secondaryAction.text}
                </button>
            `;
        }
        if (config.primaryAction) {
            actionsHtml += `
                <button class="btn-primary" onclick="${config.primaryAction.onclick}">
                    <i class="fa-solid ${config.primaryAction.icon}"></i> ${config.primaryAction.text}
                </button>
            `;
        }
        actionsContainer.innerHTML = actionsHtml;
    }

    // Sync URL hash without triggering scroll
    if (window.location.hash !== `#${tabId}`) {
        history.replaceState(null, null, `#${tabId}`);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Listen for hash in URL on load & back/forward
function initDashboard() {
    const hash = window.location.hash.replace('#', '');
    if (hash && tabConfig[hash]) {
        switchTab(hash);
    } else {
        switchTab('dashboard');
    }
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && tabConfig[hash]) {
        switchTab(hash);
    }
});


// ============================================================
// TOAST NOTIFICATION SYSTEM
// ============================================================
let toastTimeout;
function showToast(message, iconClass = 'fa-circle-check', isError = false) {
    const toast = document.getElementById('toast-notif');
    const msgEl = document.getElementById('toast-message');
    const iconEl = toast ? toast.querySelector('i') : null;

    if (!toast || !msgEl) return;

    msgEl.innerText = message;
    if (iconEl) {
        iconEl.className = `fa-solid ${iconClass}`;
        iconEl.style.color = isError ? '#ef4444' : '#10b981';
    }

    toast.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

// ============================================================
// MODALS MANAGEMENT
// ============================================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close modals when clicking outside modal card
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// ============================================================
// DRAWERS (SLIDE-OVER PANELS)
// ============================================================
function closeDrawer(drawerId) {
    const drawer = document.getElementById(drawerId);
    if (drawer) {
        drawer.classList.remove('active');
    }
}

// ============================================================
// AGENDA TAB FUNCTIONS
// ============================================================
function changeDate(delta) {
    showToast('Data da agenda atualizada!');
}

function updateStatus(button, newStatus) {
    const card = button.closest('.appointment-card');
    const slot = button.closest('.timeline-slot');
    if (!card || !slot) return;

    const rightSide = card.querySelector('.card-right-side');
    slot.setAttribute('data-status', newStatus);

    if (newStatus === 'em-atendimento') {
        card.className = 'appointment-card status-ongoing';
        rightSide.innerHTML = `
            <span class="status-badge em-atendimento">
                <i class="fa-solid fa-spinner fa-spin"></i> Em Atendimento
            </span>
            <div class="action-btns">
                <button class="btn-action btn-complete" onclick="updateStatus(this, 'concluido')">
                    <i class="fa-solid fa-check"></i> Concluir
                </button>
            </div>
        `;
        showToast('Atendimento iniciado com sucesso!');
    } else if (newStatus === 'concluido') {
        card.className = 'appointment-card status-completed';
        rightSide.innerHTML = `
            <span class="status-badge concluido">
                <i class="fa-solid fa-check-double"></i> Concluído
            </span>
            <button class="btn-icon-only" title="Ver Detalhes" onclick="switchTab('historico')">
                <i class="fa-solid fa-eye"></i>
            </button>
        `;
        showToast('Atendimento concluído!');
    } else if (newStatus === 'cancelado') {
        card.className = 'appointment-card status-canceled';
        rightSide.innerHTML = `
            <span class="status-badge cancelado">
                <i class="fa-solid fa-ban"></i> Cancelado
            </span>
        `;
        showToast('Consulta cancelada.', 'fa-circle-exclamation', true);
    }

    recalculateAgendaStats();
}

function filterAppointments() {
    const searchInput = document.getElementById('search-agenda-input');
    const statusSelect = document.getElementById('agenda-status-filter');
    if (!searchInput || !statusSelect) return;

    const searchTerm = searchInput.value.toLowerCase();
    const statusTerm = statusSelect.value;
    const slots = document.querySelectorAll('#appointment-list .timeline-slot');

    slots.forEach(slot => {
        const name = (slot.getAttribute('data-name') || '').toLowerCase();
        const status = slot.getAttribute('data-status');
        const doctor = slot.getAttribute('data-doctor');

        const matchesName = name.includes(searchTerm);
        const matchesStatus = (statusTerm === 'todos' || status === statusTerm);
        const matchesDoctor = (selectedAgendaDoctorFilter === 'todos' || doctor === selectedAgendaDoctorFilter);

        if (matchesName && matchesStatus && matchesDoctor) {
            slot.style.display = 'grid';
        } else {
            slot.style.display = 'none';
        }
    });
}

function filterAgendaDoctor(doctorName, element) {
    selectedAgendaDoctorFilter = doctorName;
    document.querySelectorAll('.doctor-item').forEach(el => el.classList.remove('active'));
    if (element) element.classList.add('active');
    filterAppointments();
}

function saveAppointment(e) {
    e.preventDefault();
    const name = document.getElementById('input-paciente').value;
    const doctor = document.getElementById('input-medico').value;
    const spec = document.getElementById('input-especialidade').value;
    const time = document.getElementById('input-horario').value;
    const obs = document.getElementById('input-obs').value || 'Consulta';

    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    const newSlotHTML = `
        <div class="timeline-slot" data-status="confirmado" data-doctor="${doctor}" data-name="${name}">
            <div class="time-label">${time}</div>
            <div class="appointment-card status-confirmed">
                <div class="patient-details">
                    <div class="patient-avatar">${initials}</div>
                    <div class="patient-info">
                        <div class="name">${name}</div>
                        <div class="meta">
                            <span>${spec}</span>
                            <span class="meta-dot"></span>
                            <span>${doctor}</span>
                            <span class="meta-dot"></span>
                            <span>${obs}</span>
                        </div>
                    </div>
                </div>
                <div class="card-right-side">
                    <span class="status-badge confirmado">
                        <i class="fa-solid fa-circle-check"></i> Confirmado
                    </span>
                    <div class="action-btns">
                        <button class="btn-action btn-start" onclick="updateStatus(this, 'em-atendimento')">
                            <i class="fa-solid fa-play"></i> Iniciar
                        </button>
                        <button class="btn-action btn-cancel" onclick="updateStatus(this, 'cancelado')">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    const list = document.getElementById('appointment-list');
    if (list) {
        list.insertAdjacentHTML('beforeend', newSlotHTML);
    }
    closeModal('modal-agendamento');
    document.getElementById('form-novo-agendamento').reset();
    showToast('Novo agendamento registrado com sucesso!');
    recalculateAgendaStats();
}

function recalculateAgendaStats() {
    const slots = document.querySelectorAll('#appointment-list .timeline-slot');
    let waiting = 0, ongoing = 0, completed = 0;

    slots.forEach(slot => {
        const st = slot.getAttribute('data-status');
        if (st === 'aguardando') waiting++;
        if (st === 'em-atendimento') ongoing++;
        if (st === 'concluido') completed++;
    });

    const totalEl = document.getElementById('stat-total-agenda');
    const waitEl = document.getElementById('stat-waiting-agenda');
    const ongEl = document.getElementById('stat-ongoing-agenda');
    const compEl = document.getElementById('stat-completed-agenda');

    if (totalEl) totalEl.innerText = slots.length;
    if (waitEl) waitEl.innerText = waiting;
    if (ongEl) ongEl.innerText = ongoing;
    if (compEl) compEl.innerText = completed;
}

function exportSchedule() {
    showToast('Relatório da agenda exportado em PDF com sucesso!');
}

// ============================================================
// PACIENTES TAB FUNCTIONS
// ============================================================
function openPatientModal() {
    document.getElementById('modal-patient-title').innerText = 'Cadastrar Novo Paciente';
    document.getElementById('form-paciente').reset();
    openModal('modal-paciente');
}

function closePatientModal() {
    closeModal('modal-paciente');
}

function savePatient(e) {
    e.preventDefault();
    const name = document.getElementById('p-nome').value;
    const cpf = document.getElementById('p-cpf').value;
    const phone = document.getElementById('p-tel').value;
    const plan = document.getElementById('p-plan').value;

    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    let planTagClass = 'particular';
    let planText = plan;
    if (plan === 'Unimed') { planTagClass = 'unimed'; planText = 'Unimed VTRM'; }
    if (plan === 'Bradesco') { planTagClass = 'bradesco'; planText = 'Bradesco Saúde'; }

    const newRowHTML = `
        <tr data-name="${name}" data-cpf="${cpf}" data-plan="${plan}" data-status="ativo">
            <td>
                <div class="patient-cell">
                    <div class="patient-avatar">${initials}</div>
                    <div class="patient-info">
                        <div class="name">${name}</div>
                        <div class="sub">Novo Cadastro</div>
                    </div>
                </div>
            </td>
            <td>
                <div class="contact-info">
                    <div class="phone">${phone}</div>
                    <div class="cpf">${cpf}</div>
                </div>
            </td>
            <td>
                <span class="health-plan-tag ${planTagClass}">${planText}</span>
            </td>
            <td>
                <div style="font-weight: 700; font-size: 13px;">Sem consulta</div>
                <div style="font-size: 11px; color: var(--text-muted);">-</div>
            </td>
            <td>
                <span class="status-badge ativo">
                    <i class="fa-solid fa-circle" style="font-size: 8px;"></i> Ativo
                </span>
            </td>
            <td class="actions-cell">
                <button class="btn-table-action primary-hover" title="Ver Prontuário" onclick="openPatientDrawer('${name}', '${initials}', 'Novo Paciente', '${phone}', '${cpf}', '${planText}', 'Sem atendimentos registrados')">
                    <i class="fa-solid fa-address-card"></i>
                </button>
                <button class="btn-table-action primary-hover" title="Editar Paciente" onclick="editPatient(this)">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-table-action danger-hover" title="Inativar Paciente" onclick="togglePatientStatus(this)">
                    <i class="fa-solid fa-user-minus"></i>
                </button>
            </td>
        </tr>
    `;

    const tbody = document.getElementById('patient-table-body');
    if (tbody) {
        tbody.insertAdjacentHTML('afterbegin', newRowHTML);
    }
    closePatientModal();
    showToast('Paciente cadastrado com sucesso!');
    updatePatientCounters();
}

function filterPatients() {
    const searchInput = document.getElementById('search-patient');
    const planSelect = document.getElementById('filter-patient-plan');
    const statusSelect = document.getElementById('filter-patient-status');
    if (!searchInput || !planSelect || !statusSelect) return;

    const searchTerm = searchInput.value.toLowerCase();
    const planTerm = planSelect.value;
    const statusTerm = statusSelect.value;
    const rows = document.querySelectorAll('#patient-table-body tr');

    rows.forEach(row => {
        const name = (row.getAttribute('data-name') || '').toLowerCase();
        const cpf = (row.getAttribute('data-cpf') || '').toLowerCase();
        const plan = row.getAttribute('data-plan');
        const status = row.getAttribute('data-status');

        const matchesSearch = name.includes(searchTerm) || cpf.includes(searchTerm);
        const matchesPlan = (planTerm === 'todos' || plan === planTerm);
        const matchesStatus = (statusTerm === 'todos' || status === statusTerm);

        if (matchesSearch && matchesPlan && matchesStatus) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function togglePatientStatus(btn) {
    const row = btn.closest('tr');
    const statusCell = row.querySelector('.status-badge');
    const currentStatus = row.getAttribute('data-status');

    if (currentStatus === 'ativo') {
        row.setAttribute('data-status', 'inativo');
        statusCell.className = 'status-badge inativo';
        statusCell.innerHTML = '<i class="fa-solid fa-circle" style="font-size: 8px;"></i> Inativo';
        btn.className = 'btn-table-action primary-hover';
        btn.title = 'Reativar Paciente';
        btn.innerHTML = '<i class="fa-solid fa-user-check"></i>';
        showToast('Paciente inativado com sucesso!', 'fa-user-slash', true);
    } else {
        row.setAttribute('data-status', 'ativo');
        statusCell.className = 'status-badge ativo';
        statusCell.innerHTML = '<i class="fa-solid fa-circle" style="font-size: 8px;"></i> Ativo';
        btn.className = 'btn-table-action danger-hover';
        btn.title = 'Inativar Paciente';
        btn.innerHTML = '<i class="fa-solid fa-user-minus"></i>';
        showToast('Paciente reativado com sucesso!');
    }
    updatePatientCounters();
}

function editPatient(btn) {
    const row = btn.closest('tr');
    const name = row.getAttribute('data-name');
    const cpf = row.getAttribute('data-cpf');

    document.getElementById('modal-patient-title').innerText = 'Editar Dados do Paciente';
    document.getElementById('p-nome').value = name;
    document.getElementById('p-cpf').value = cpf;
    const phoneEl = row.querySelector('.phone');
    if (phoneEl) document.getElementById('p-tel').value = phoneEl.innerText;
    openModal('modal-paciente');
}

function openPatientDrawer(name, initials, age, phone, cpf, plan, lastConsult) {
    document.getElementById('d-patient-name').innerText = name;
    document.getElementById('d-patient-avatar').innerText = initials;
    document.getElementById('d-patient-meta').innerText = age + ' • CPF: ' + cpf;
    document.getElementById('d-patient-phone').innerText = phone;
    document.getElementById('d-patient-plan').innerText = plan;
    document.getElementById('d-patient-last').innerText = lastConsult;

    const drawer = document.getElementById('drawer-prontuario');
    if (drawer) drawer.classList.add('active');
}

function updatePatientCounters() {
    const rows = document.querySelectorAll('#patient-table-body tr');
    let total = rows.length;
    let active = 0, inactive = 0;

    rows.forEach(r => {
        if (r.getAttribute('data-status') === 'ativo') active++;
        else inactive++;
    });

    const totEl = document.getElementById('stat-total-patients');
    const actEl = document.getElementById('stat-active-patients');
    const inactEl = document.getElementById('stat-inactive-patients');

    if (totEl) totEl.innerText = total + 150;
    if (actEl) actEl.innerText = active + 144;
    if (inactEl) inactEl.innerText = inactive + 6;
}

function exportPatients() {
    showToast('Lista de pacientes exportada em XLS com sucesso!');
}

// ============================================================
// PROFISSIONAIS (CORPO CLÍNICO) TAB FUNCTIONS
// ============================================================
function openDoctorModal() {
    document.getElementById('modal-doctor-title').innerText = 'Cadastrar Novo Profissional';
    document.getElementById('form-profissional').reset();
    openModal('modal-profissional');
}

function closeDoctorModal() {
    closeModal('modal-profissional');
}

function saveDoctor(e) {
    e.preventDefault();
    const name = document.getElementById('doc-nome').value;
    const reg = document.getElementById('doc-reg').value;
    const spec = document.getElementById('doc-spec').value;
    const status = document.getElementById('doc-status').value;
    const phone = document.getElementById('doc-tel').value;

    const initials = name.replace('Dr. ', '').replace('Dra. ', '').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    let iconClass = 'fa-user-doctor';
    if (spec === 'Fisioterapia') iconClass = 'fa-child-reaching';
    if (spec === 'Odontologia') iconClass = 'fa-tooth';
    if (spec === 'Psicologia') iconClass = 'fa-brain';
    if (spec === 'Cardiologia') iconClass = 'fa-heart-pulse';
    if (spec === 'Pediatria') iconClass = 'fa-baby';

    let statusBadgeHTML = '<span class="status-badge ativo"><i class="fa-solid fa-circle" style="font-size: 7px;"></i> Ativo</span>';
    if (status === 'ferias') statusBadgeHTML = '<span class="status-badge ferias"><i class="fa-solid fa-plane" style="font-size: 7px;"></i> Férias</span>';

    const newCardHTML = `
        <div class="doctor-card" data-name="${name}" data-reg="${reg}" data-spec="${spec}" data-status="${status}">
            <div class="doc-header-row">
                <div class="doc-avatar-box">${initials}</div>
                <div class="doc-main-info">
                    <h3>${name}</h3>
                    <div class="registration">${reg}</div>
                    <span class="specialty-badge">
                        <i class="fa-solid ${iconClass}"></i> ${spec}
                    </span>
                </div>
            </div>

            <div class="doc-details-list">
                <div class="doc-detail-item">
                    <span>Consultas Hoje:</span>
                    <strong>0 agendadas</strong>
                </div>
                <div class="doc-detail-item">
                    <span>Horário:</span>
                    <strong>08:00 - 17:00</strong>
                </div>
                <div class="doc-detail-item">
                    <span>Status:</span>
                    ${statusBadgeHTML}
                </div>
            </div>

            <div class="card-actions">
                <button class="btn-card-primary" onclick="openDoctorDrawer('${name}', '${initials}', '${reg}', '${spec}', '${phone}', '0 consultas hoje')">
                    <i class="fa-solid fa-calendar-check"></i> Ver Agenda
                </button>
                <button class="btn-card-icon" title="Editar Profissional" onclick="editDoctor(this)">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-card-icon danger" title="Inativar/Férias" onclick="toggleDoctorStatus(this)">
                    <i class="fa-solid fa-user-slash"></i>
                </button>
            </div>
        </div>
    `;

    const grid = document.getElementById('doctors-grid-container');
    if (grid) {
        grid.insertAdjacentHTML('afterbegin', newCardHTML);
    }
    closeDoctorModal();
    showToast('Profissional cadastrado com sucesso!');
    updateDoctorCounters();
}

function filterDoctors() {
    const searchInput = document.getElementById('search-doctor');
    if (!searchInput) return;

    const searchTerm = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.doctor-card');

    cards.forEach(card => {
        const name = (card.getAttribute('data-name') || '').toLowerCase();
        const reg = (card.getAttribute('data-reg') || '').toLowerCase();
        const spec = card.getAttribute('data-spec');

        const matchesSearch = name.includes(searchTerm) || reg.includes(searchTerm);
        const matchesSpec = (selectedSpecialtyFilter === 'todas' || spec === selectedSpecialtyFilter);

        if (matchesSearch && matchesSpec) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterBySpecialty(specialty, element) {
    selectedSpecialtyFilter = specialty;
    document.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
    if (element) element.classList.add('active');
    filterDoctors();
}

function toggleDoctorStatus(btn) {
    const card = btn.closest('.doctor-card');
    const statusCell = card.querySelector('.status-badge');
    const currentStatus = card.getAttribute('data-status');

    if (currentStatus === 'ativo') {
        card.setAttribute('data-status', 'ferias');
        statusCell.className = 'status-badge ferias';
        statusCell.innerHTML = '<i class="fa-solid fa-plane" style="font-size: 7px;"></i> Férias';
        btn.title = 'Reativar Férias';
        btn.innerHTML = '<i class="fa-solid fa-user-check"></i>';
        showToast('Profissional alterado para Férias!');
    } else {
        card.setAttribute('data-status', 'ativo');
        statusCell.className = 'status-badge ativo';
        statusCell.innerHTML = '<i class="fa-solid fa-circle" style="font-size: 7px;"></i> Ativo';
        btn.title = 'Inativar/Férias';
        btn.innerHTML = '<i class="fa-solid fa-user-slash"></i>';
        showToast('Profissional reativado com sucesso!');
    }
    updateDoctorCounters();
}

function editDoctor(btn) {
    const card = btn.closest('.doctor-card');
    const name = card.getAttribute('data-name');
    const reg = card.getAttribute('data-reg');

    document.getElementById('modal-doctor-title').innerText = 'Editar Profissional';
    document.getElementById('doc-nome').value = name;
    document.getElementById('doc-reg').value = reg;
    openModal('modal-profissional');
}

function openDoctorDrawer(name, initials, reg, spec, phone, summary) {
    document.getElementById('d-doctor-name').innerText = name;
    document.getElementById('d-doctor-avatar').innerText = initials;
    document.getElementById('d-doctor-reg').innerText = reg + ' • ' + spec;
    document.getElementById('d-doctor-phone').innerText = phone;
    document.getElementById('d-doctor-summary').innerText = summary;

    const drawer = document.getElementById('drawer-doctor');
    if (drawer) drawer.classList.add('active');
}

function updateDoctorCounters() {
    const cards = document.querySelectorAll('.doctor-card');
    let total = cards.length;
    let active = 0, vacation = 0;

    cards.forEach(c => {
        if (c.getAttribute('data-status') === 'ativo') active++;
        else vacation++;
    });

    const totEl = document.getElementById('stat-total-doctors');
    const actEl = document.getElementById('stat-working-today');
    const vacEl = document.getElementById('stat-vacation-doctors');

    if (totEl) totEl.innerText = total;
    if (actEl) actEl.innerText = active;
    if (vacEl) vacEl.innerText = vacation;
}

function exportDoctors() {
    showToast('Lista do corpo clínico exportada em PDF com sucesso!');
}

// ============================================================
// HISTÓRICO TAB FUNCTIONS
// ============================================================
function filterHistory() {
    const searchInput = document.getElementById('search-history');
    const docSelect = document.getElementById('filter-history-doctor');
    const statusSelect = document.getElementById('filter-history-status');
    if (!searchInput || !docSelect || !statusSelect) return;

    const searchTerm = searchInput.value.toLowerCase();
    const doctorTerm = docSelect.value;
    const statusTerm = statusSelect.value;
    const rows = document.querySelectorAll('#history-table-body tr');

    rows.forEach(row => {
        const patient = (row.getAttribute('data-patient') || '').toLowerCase();
        const doctor = row.getAttribute('data-doctor');
        const status = row.getAttribute('data-status');

        const matchesSearch = patient.includes(searchTerm) || (doctor && doctor.toLowerCase().includes(searchTerm));
        const matchesDoctor = (doctorTerm === 'todos' || doctor === doctorTerm);
        const matchesStatus = (statusTerm === 'todos' || status === statusTerm);

        if (matchesSearch && matchesDoctor && matchesStatus) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function openHistoryDrawer(patient, doctor, spec, datetime, procedure, notes) {
    document.getElementById('h-patient').innerText = patient;
    document.getElementById('h-doctor').innerText = doctor;
    document.getElementById('h-spec').innerText = spec;
    document.getElementById('h-datetime').innerText = datetime;
    document.getElementById('h-proc').innerText = procedure;
    document.getElementById('h-notes').innerText = notes;

    const drawer = document.getElementById('drawer-historico');
    if (drawer) drawer.classList.add('active');
}

function exportHistory() {
    showToast('Relatório de histórico exportado em PDF/XLS!');
}
