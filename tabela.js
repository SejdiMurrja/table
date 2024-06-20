document.addEventListener('DOMContentLoaded', () => {
    const addRowBtn = document.getElementById('addRowBtn');
    const formContainer = document.getElementById('formContainer');
    const closeModal = document.querySelector('.close');
    const subscriptionForm = document.getElementById('subscriptionForm');
    const tableBody = document.getElementById('tableBody');

    let editingRow = null;

    const subscriptions = [
        {
            firstName: 'Sejdi',
            lastName: 'Murrja',
            age: 20,
            startDate: '2024-01-01',
            endDate: '2024-06-20',
            subscriptionType: 'Premium',
            active: 'Po',
            payment: 100,
            paymentMethod: 'VISA'
        },

        {
            firstName: 'Ana',
            lastName: 'Kalo',
            age: 21,
            startDate: '2023-01-01',
            endDate: '2024-12-11',
            subscriptionType: 'VIP',
            active: 'Po',
            payment: 200,
            paymentMethod: 'PayPal'
        }
    ];

    const renderTable = () => {
        tableBody.innerHTML = '';
        subscriptions.forEach((sub, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${sub.firstName}</td>
                <td>${sub.lastName}</td>
                <td>${sub.age}</td>
                <td>${sub.startDate}</td>
                <td>${sub.endDate}</td>
                <td>${sub.subscriptionType}</td>
                <td>${sub.active}</td>
                <td>${sub.payment}</td>
                <td>${sub.paymentMethod}</td>
                <td>
                    <button class="editBtn" data-index="${index}">Edit</button>
                    <button class="deleteBtn" data-index="${index}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    const openForm = () => {
        formContainer.style.display = 'block';
        if (editingRow !== null) {
            const sub = subscriptions[editingRow];
            subscriptionForm.firstName.value = sub.firstName;
            subscriptionForm.lastName.value = sub.lastName;
            subscriptionForm.age.value = sub.age;
            subscriptionForm.startDate.value = sub.startDate;
            subscriptionForm.endDate.value = sub.endDate;
            subscriptionForm.subscriptionType.value = sub.subscriptionType;
            subscriptionForm.active.value = sub.active;
            subscriptionForm.payment.value = sub.payment;
            subscriptionForm.paymentMethod.value = sub.paymentMethod;
        } else {
            subscriptionForm.reset();
        }
    };

    const closeForm = () => {
        formContainer.style.display = 'none';
        editingRow = null;
    };

    const saveSubscription = (e) => {
        e.preventDefault();

        const newSubscription = {
            firstName: subscriptionForm.firstName.value,
            lastName: subscriptionForm.lastName.value,
            age: subscriptionForm.age.value,
            startDate: subscriptionForm.startDate.value,
            endDate: subscriptionForm.endDate.value,
            subscriptionType: subscriptionForm.subscriptionType.value,
            active: subscriptionForm.active.value,
            payment: subscriptionForm.payment.value,
            paymentMethod: subscriptionForm.paymentMethod.value
        };

        if (editingRow !== null) {
            subscriptions[editingRow] = newSubscription;
        } else {
            subscriptions.push(newSubscription);
        }

        renderTable();
        closeForm();
    };

    const editSubscription = (index) => {
        editingRow = index;
        openForm();
    };

    const deleteSubscription = (index) => {
        subscriptions.splice(index, 1);
        renderTable();
    };

    addRowBtn.addEventListener('click', openForm);
    closeModal.addEventListener('click', closeForm);
    window.addEventListener('click', (event) => {
        if (event.target === formContainer) {
            closeForm();
        }
    });

    tableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('editBtn')) {
            editSubscription(e.target.dataset.index);
        } else if (e.target.classList.contains('deleteBtn')) {
            deleteSubscription(e.target.dataset.index);
        }
    });

    subscriptionForm.addEventListener('submit', saveSubscription);

    renderTable();
});
