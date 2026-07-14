// Comprehensive dataset of 18 standard matrix types
const matricesData = [
    { id: "row", name: "Row Matrix", desc: "A matrix with exactly one row and any number of columns.", example: [[1, 2, 3]], highlight: (r, c) => true },
    { id: "column", name: "Column Matrix", desc: "A matrix with exactly one column and any number of rows.", example: [[1], [2], [3]], highlight: (r, c) => true },
    { id: "square", name: "Square Matrix", desc: "A matrix with an equal number of rows and columns (n × n).", example: [[4, 7, 2], [3, 9, 1], [8, 5, 6]], highlight: (r, c) => true },
    { id: "zero", name: "Zero / Null Matrix", desc: "A matrix where every single element is zero.", example: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], highlight: (r, c) => false },
    { id: "diagonal", name: "Diagonal Matrix", desc: "A square matrix where all entries outside the main diagonal are zero.", example: [[5, 0, 0], [0, 8, 0], [0, 0, 3]], highlight: (r, c) => r === c },
    { id: "identity", name: "Identity Matrix", desc: "A diagonal matrix where all elements on the main diagonal equal 1.", example: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], highlight: (r, c) => r === c },
    { id: "scalar", name: "Scalar Matrix", desc: "A diagonal matrix where all main diagonal elements are equal to the same non-zero constant.", example: [[7, 0, 0], [0, 7, 0], [0, 0, 7]], highlight: (r, c) => r === c },
    { id: "upper-tri", name: "Upper Triangular Matrix", desc: "A square matrix where all elements below the main diagonal are zero.", example: [[4, 2, 9], [0, 5, 1], [0, 0, 7]], highlight: (r, c) => r <= c },
    { id: "lower-tri", name: "Lower Triangular Matrix", desc: "A square matrix where all elements above the main diagonal are zero.", example: [[3, 0, 0], [6, 2, 0], [8, 4, 1]], highlight: (r, c) => r >= c },
    { id: "symmetric", name: "Symmetric Matrix", desc: "A square matrix that is equal to its transpose (A = Aᵀ). Notice the mirrored values across the diagonal.", example: [[1, 7, 3], [7, 4, -5], [3, -5, 6]], highlight: (r, c) => r !== c }, 
    { id: "skew-symmetric", name: "Skew-Symmetric Matrix", desc: "A square matrix whose transpose equals its negative (Aᵀ = -A). Main diagonal entries must always be zero.", example: [[0, 2, -3], [-2, 0, 4], [3, -4, 0]], highlight: (r, c) => r === c },
    { id: "orthogonal", name: "Orthogonal Matrix", desc: "A square matrix whose multiplication with its transpose yields the identity matrix (A · Aᵀ = I).", example: [[0, 1, 0], [1, 0, 0], [0, 0, 1]], highlight: (r, c) => true }, 
    { id: "singular", name: "Singular Matrix", desc: "A square matrix whose determinant is exactly zero; it does not possess a multiplicative inverse.", example: [[1, 2, 3], [2, 4, 6], [1, 1, 1]], highlight: (r, c) => true },
    { id: "non-singular", name: "Non-Singular Matrix", desc: "A square matrix whose determinant is non-zero, meaning it is completely invertible.", example: [[1, 0, 2], [2, -1, 3], [4, 1, 8]], highlight: (r, c) => true },
    { id: "idempotent", name: "Idempotent Matrix", desc: "A matrix which, when multiplied by itself, yields itself unchanged (A² = A).", example: [[1, 0, 0], [0, 1, 0], [0, 0, 0]], highlight: (r, c) => true },
    { id: "involutory", name: "Involutory Matrix", desc: "A matrix that acts as its own inverse, meaning squaring it yields the identity matrix (A² = I).", example: [[0, 1, 0], [1, 0, 0], [0, 0, 1]], highlight: (r, c) => true },
    { id: "nilpotent", name: "Nilpotent Matrix", desc: "A square matrix A such that A raised to some positive integer power k results entirely in a zero matrix (Aᵏ = 0).", example: [[0, 1, 2], [0, 0, 3], [0, 0, 0]], highlight: (r, c) => true },
    { id: "unitary", name: "Unitary Matrix", desc: "A complex square matrix whose conjugate transpose is also its inverse.", example: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], highlight: (r, c) => true }
];

const grid = document.getElementById('matrixGrid');
const visualizer = document.getElementById('matrixVisualizer');
const activeTitle = document.getElementById('activeTitle');
const activeDescription = document.getElementById('activeDescription');
const searchBar = document.getElementById('searchBar');

// Render the 18 cards dynamically
matricesData.forEach(matrix => {
    const card = document.createElement('div');
    card.className = 'matrix-card';
    card.innerHTML = `<h3>${matrix.name}</h3><p>${matrix.desc}</p>`;
    card.addEventListener('click', () => updateVisualizer(matrix));
    grid.appendChild(card);
});

// Update interactive workspace
function updateVisualizer(matrix) {
    activeTitle.innerText = matrix.name;
    activeDescription.innerText = matrix.desc;
    visualizer.innerHTML = '';
    
    const rows = matrix.example.length;
    const cols = matrix.example[0].length;
    
    visualizer.style.gridTemplateColumns = `repeat(${cols}, 50px)`;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            cell.innerText = matrix.example[r][c];
            
            if (matrix.highlight(r, c)) {
                cell.classList.add('highlight');
            }
            visualizer.appendChild(cell);
        }
    }
}

// Live filtering search feature
searchBar.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.matrix-card');
    
    cards.forEach((card, index) => {
        const match = matricesData[index].name.toLowerCase().includes(query) || 
                      matricesData[index].desc.toLowerCase().includes(query);
        card.classList.toggle('hidden', !match);
    });
});

// Tab Switch System Engine
function switchTab(tabId) {
    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    // Remove active styling from buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show chosen tab & target active button styling
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Initialize dashboard with Identity Matrix displayed first
updateVisualizer(matricesData[5]);    const cards = document.querySelectorAll('.matrix-card');
    
    cards.forEach((card, index) => {
        const match = matricesData[index].name.toLowerCase().includes(query) || 
                      matricesData[index].desc.toLowerCase().includes(query);
        card.classList.toggle('hidden', !match);
    });
});

// Initialize dashboard with Identity Matrix displayed first
updateVisualizer(matricesData[5]);
