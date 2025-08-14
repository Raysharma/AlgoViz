// Global variables
let currentArray = [];
let isAnimating = false;
let animationSpeed = 200;
let arraySize = 10;
let stats = { comparisons: 0, swaps: 0, steps: 0 };

// Algorithm data
const algorithms = {
    sorting: [
        {
            name: "Bubble Sort",
            description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
            timeComplexity: "O(n²)",
            spaceComplexity: "O(1)",
            cCode: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    int i, j, temp;
    
    // Outer loop for number of passes
    for (i = 0; i < n - 1; i++) {
        
        // Inner loop for comparisons in each pass
        for (j = 0; j < n - i - 1; j++) {
            
            // Compare adjacent elements
            if (arr[j] > arr[j + 1]) {
                
                // Swap if they are in wrong order
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    
    bubbleSort(arr, n);
    
    printf("\\nSorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    
    return 0;
}`,
            steps: [
                "Start with the first element of the array",
                "Compare it with the next element",
                "If the first element is greater, swap them",
                "Move to the next pair and repeat",
                "After each complete pass, the largest element 'bubbles up' to the end",
                "Repeat until no more swaps are needed"
            ]
        },
        {
            name: "Selection Sort",
            description: "An in-place comparison sorting algorithm that divides the input list into sorted and unsorted regions, and repeatedly selects the smallest element from the unsorted region.",
            timeComplexity: "O(n²)",
            spaceComplexity: "O(1)",
            cCode: `#include <stdio.h>

void selectionSort(int arr[], int n) {
    int i, j, min_idx, temp;
    
    // Move boundary of unsorted subarray
    for (i = 0; i < n - 1; i++) {
        
        // Find the minimum element in unsorted array
        min_idx = i;
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        
        // Swap the found minimum element with first element
        if (min_idx != i) {
            temp = arr[min_idx];
            arr[min_idx] = arr[i];
            arr[i] = temp;
        }
    }
}

int main() {
    int arr[] = {64, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    printf("Original array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    
    selectionSort(arr, n);
    
    printf("\\nSorted array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    
    return 0;
}`,
            steps: [
                "Find the minimum element in the unsorted portion",
                "Swap it with the first element of the unsorted portion",
                "Move the boundary between sorted and unsorted portions",
                "Repeat until the entire array is sorted",
                "The sorted portion grows from left to right",
                "Each pass places one element in its final position"
            ]
        }
    ],
    searching: [
        {
            name: "Linear Search",
            description: "A simple search algorithm that finds the position of a target value within a list by checking each element sequentially.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            cCode: `#include <stdio.h>

int linearSearch(int arr[], int n, int target) {
    int i;
    
    // Check each element one by one
    for (i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;  // Return index if found
        }
    }
    
    return -1;  // Return -1 if not found
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 10;
    
    int result = linearSearch(arr, n, target);
    
    if (result == -1) {
        printf("Element not found");
    } else {
        printf("Element found at index %d", result);
    }
    
    return 0;
}`,
            steps: [
                "Start from the first element of the array",
                "Compare the current element with the target value",
                "If they match, return the current index",
                "If not, move to the next element",
                "Repeat until element is found or array ends",
                "Return -1 if element is not found"
            ]
        },
        {
            name: "Binary Search",
            description: "An efficient search algorithm that finds the position of a target value within a sorted array by repeatedly dividing the search interval in half.",
            timeComplexity: "O(log n)",
            spaceComplexity: "O(1)",
            cCode: `#include <stdio.h>

int binarySearch(int arr[], int left, int right, int target) {
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        // If target is present at mid
        if (arr[mid] == target) {
            return mid;
        }
        
        // If target is greater, ignore left half
        if (arr[mid] < target) {
            left = mid + 1;
        }
        // If target is smaller, ignore right half
        else {
            right = mid - 1;
        }
    }
    
    return -1;  // Element not found
}

int main() {
    int arr[] = {2, 3, 4, 10, 40};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 10;
    
    int result = binarySearch(arr, 0, n - 1, target);
    
    if (result == -1) {
        printf("Element not found");
    } else {
        printf("Element found at index %d", result);
    }
    
    return 0;
}`,
            steps: [
                "Array must be sorted first",
                "Find the middle element of the array",
                "Compare middle element with target value",
                "If equal, return the middle index",
                "If target is smaller, search the left half",
                "If target is larger, search the right half",
                "Repeat until element is found or search space is empty"
            ]
        }
    ],
    arrays: [
        {
            name: "Array Traversal",
            description: "The process of visiting each element of an array exactly once to perform some operation.",
            timeComplexity: "O(n)",
            spaceComplexity: "O(1)",
            cCode: `#include <stdio.h>

void traverseArray(int arr[], int n) {
    printf("Array elements: ");
    
    // Visit each element one by one
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
        
        // You can perform any operation here
        // For example: sum += arr[i];
    }
    printf("\\n");
}

int main() {
    int arr[] = {1, 2, 3, 4, 5};
    int n = sizeof(arr) / sizeof(arr[0]);
    
    traverseArray(arr, n);
    
    return 0;
}`,
            steps: [
                "Start with the first element (index 0)",
                "Process the current element",
                "Move to the next element (increment index)",
                "Repeat until all elements are processed",
                "Time complexity is O(n) as we visit each element once"
            ]
        }
    ],
    stacks: [
        {
            name: "Stack Operations",
            description: "A stack is a linear data structure that follows the Last In First Out (LIFO) principle. Elements are added and removed from the same end called the top.",
            timeComplexity: "O(1)",
            spaceComplexity: "O(n)",
            cCode: `#include <stdio.h>
#include <stdlib.h>
#define MAX 100

struct Stack {
    int items[MAX];
    int top;
};

void initStack(struct Stack* s) {
    s->top = -1;
}

int isEmpty(struct Stack* s) {
    return s->top == -1;
}

int isFull(struct Stack* s) {
    return s->top == MAX - 1;
}

void push(struct Stack* s, int item) {
    if (isFull(s)) {
        printf("Stack Overflow\\n");
        return;
    }
    s->items[++s->top] = item;
    printf("Pushed %d\\n", item);
}

int pop(struct Stack* s) {
    if (isEmpty(s)) {
        printf("Stack Underflow\\n");
        return -1;
    }
    return s->items[s->top--];
}

int peek(struct Stack* s) {
    if (isEmpty(s)) {
        printf("Stack is empty\\n");
        return -1;
    }
    return s->items[s->top];
}

int main() {
    struct Stack s;
    initStack(&s);
    
    push(&s, 10);
    push(&s, 20);
    push(&s, 30);
    
    printf("Top element: %d\\n", peek(&s));
    printf("Popped: %d\\n", pop(&s));
    printf("Top element: %d\\n", peek(&s));
    
    return 0;
}`,
            steps: [
                "Initialize stack with top = -1 (empty)",
                "Push: Add element to top, increment top pointer",
                "Pop: Remove element from top, decrement top pointer",
                "Peek: Return top element without removing it",
                "Check for overflow (stack full) and underflow (stack empty)",
                "All operations are O(1) time complexity"
            ]
        }
    ]
};

// DOM elements
const algorithmGrid = document.getElementById('algorithm-grid');
const modal = document.getElementById('algorithm-modal');
const closeModal = document.getElementById('close-modal');
const navButtons = document.querySelectorAll('.nav-btn');

// Modal elements
const algoTitle = document.getElementById('algo-title');
const timeComplexity = document.getElementById('time-complexity');
const spaceComplexity = document.getElementById('space-complexity');
const algoDescription = document.getElementById('algo-description');
const cCodeBlock = document.getElementById('c-code');
const explanationSteps = document.getElementById('explanation-steps');

// Control elements
const generateBtn = document.getElementById('generate-btn');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const speedSlider = document.getElementById('speed-slider');
const sizeSlider = document.getElementById('size-slider');
const speedValue = document.getElementById('speed-value');
const sizeValue = document.getElementById('size-value');

// Stats elements
const comparisonsEl = document.getElementById('comparisons');
const swapsEl = document.getElementById('swaps');
const stepsEl = document.getElementById('steps');

// Array container
const arrayContainer = document.getElementById('array-container');

// Initialize the application
function init() {
    displayAlgorithms('sorting');
    setupEventListeners();
    generateArray();
}

// Display algorithms based on category
function displayAlgorithms(category) {
    algorithmGrid.innerHTML = '';
    
    if (algorithms[category]) {
        algorithms[category].forEach(algo => {
            const card = createAlgorithmCard(algo);
            algorithmGrid.appendChild(card);
        });
    }
}

// Create algorithm card
function createAlgorithmCard(algo) {
    const card = document.createElement('div');
    card.className = 'algorithm-card';
    card.innerHTML = `
        <h3>${algo.name}</h3>
        <p>${algo.description}</p>
        <div>
            <span class="complexity-badge">Time: ${algo.timeComplexity}</span>
            <span class="complexity-badge">Space: ${algo.spaceComplexity}</span>
        </div>
    `;
    
    card.addEventListener('click', () => openAlgorithmModal(algo));
    return card;
}

// Open algorithm modal
function openAlgorithmModal(algo) {
    algoTitle.textContent = algo.name;
    timeComplexity.textContent = algo.timeComplexity;
    spaceComplexity.textContent = algo.spaceComplexity;
    algoDescription.textContent = algo.description;
    
    // Set C code
    cCodeBlock.innerHTML = `<code>${escapeHtml(algo.cCode)}</code>`;
    
    // Set explanation steps
    explanationSteps.innerHTML = '';
    algo.steps.forEach((step, index) => {
        const li = document.createElement('li');
        li.textContent = step;
        explanationSteps.appendChild(li);
    });
    
    modal.style.display = 'block';
    resetStats();
    generateArray();
}

// Close modal
function closeAlgorithmModal() {
    modal.style.display = 'none';
    isAnimating = false;
}

// Setup event listeners
function setupEventListeners() {
    // Navigation buttons
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            navButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            displayAlgorithms(btn.dataset.category);
        });
    });
    
    // Modal controls
    closeModal.addEventListener('click', closeAlgorithmModal);
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAlgorithmModal();
        }
    });
    
    // Code tabs
    const codeTabs = document.querySelectorAll('.code-tab');
    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            codeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const codeContent = document.querySelectorAll('.code-content > *');
            codeContent.forEach(content => content.classList.remove('active'));
            
            const targetContent = document.getElementById(tab.dataset.tab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Control buttons
    generateBtn.addEventListener('click', generateArray);
    startBtn.addEventListener('click', startAlgorithm);
    resetBtn.addEventListener('click', resetVisualization);
    
    // Sliders
    speedSlider.addEventListener('input', (e) => {
        animationSpeed = parseInt(e.target.value);
        speedValue.textContent = `${animationSpeed}ms`;
    });
    
    sizeSlider.addEventListener('input', (e) => {
        arraySize = parseInt(e.target.value);
        sizeValue.textContent = arraySize;
        if (!isAnimating) {
            generateArray();
        }
    });
}

// Generate random array
function generateArray() {
    currentArray = [];
    for (let i = 0; i < arraySize; i++) {
        currentArray.push(Math.floor(Math.random() * 80) + 10);
    }
    renderArray();
    resetStats();
}

// Render array visually
function renderArray() {
    arrayContainer.innerHTML = '';
    
    currentArray.forEach((value, index) => {
        const element = document.createElement('div');
        element.className = 'array-element';
        element.style.height = `${value * 2}px`;
        element.style.width = `${Math.max(300 / arraySize, 20)}px`;
        element.textContent = value;
        element.id = `element-${index}`;
        arrayContainer.appendChild(element);
    });
}

// Start algorithm animation
async function startAlgorithm() {
    if (isAnimating) return;
    
    const algoName = algoTitle.textContent;
    
    if (algoName === 'Bubble Sort') {
        await bubbleSort();
    } else if (algoName === 'Selection Sort') {
        await selectionSort();
    } else if (algoName === 'Linear Search') {
        await linearSearch();
    } else if (algoName === 'Binary Search') {
        await binarySearch();
    }
}

// Bubble Sort implementation
async function bubbleSort() {
    isAnimating = true;
    startBtn.disabled = true;
    
    const n = currentArray.length;
    
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (!isAnimating) return;
            
            // Highlight comparing elements
            highlightElements([j, j + 1], 'comparing');
            stats.comparisons++;
            updateStats();
            await sleep(animationSpeed);
            
            if (currentArray[j] > currentArray[j + 1]) {
                // Highlight swapping elements
                highlightElements([j, j + 1], 'swapping');
                stats.swaps++;
                updateStats();
                await sleep(animationSpeed);
                
                // Perform swap
                [currentArray[j], currentArray[j + 1]] = [currentArray[j + 1], currentArray[j]];
                renderArray();
            }
            
            // Remove highlights
            removeHighlights([j, j + 1]);
            stats.steps++;
            updateStats();
        }
        
        // Mark as sorted
        highlightElements([n - 1 - i], 'sorted');
    }
    
    // Mark first element as sorted
    highlightElements([0], 'sorted');
    
    isAnimating = false;
    startBtn.disabled = false;
}

// Selection Sort implementation
async function selectionSort() {
    isAnimating = true;
    startBtn.disabled = true;
    
    const n = currentArray.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        highlightElements([minIdx], 'comparing');
        
        for (let j = i + 1; j < n; j++) {
            if (!isAnimating) return;
            
            highlightElements([j], 'comparing');
            stats.comparisons++;
            updateStats();
            await sleep(animationSpeed);
            
            if (currentArray[j] < currentArray[minIdx]) {
                removeHighlights([minIdx]);
                minIdx = j;
                highlightElements([minIdx], 'comparing');
            } else {
                removeHighlights([j]);
            }
            
            stats.steps++;
            updateStats();
        }
        
        if (minIdx !== i) {
            highlightElements([i, minIdx], 'swapping');
            stats.swaps++;
            updateStats();
            await sleep(animationSpeed);
            
            [currentArray[i], currentArray[minIdx]] = [currentArray[minIdx], currentArray[i]];
            renderArray();
        }
        
        removeHighlights([i, minIdx]);
        highlightElements([i], 'sorted');
    }
    
    highlightElements([n - 1], 'sorted');
    
    isAnimating = false;
    startBtn.disabled = false;
}

// Linear Search implementation
async function linearSearch() {
    isAnimating = true;
    startBtn.disabled = true;
    
    const target = currentArray[Math.floor(Math.random() * currentArray.length)];
    alert(`Searching for: ${target}`);
    
    for (let i = 0; i < currentArray.length; i++) {
        if (!isAnimating) return;
        
        highlightElements([i], 'comparing');
        stats.comparisons++;
        updateStats();
        await sleep(animationSpeed);
        
        if (currentArray[i] === target) {
            highlightElements([i], 'sorted');
            alert(`Found ${target} at index ${i}!`);
            break;
        }
        
        removeHighlights([i]);
        stats.steps++;
        updateStats();
    }
    
    isAnimating = false;
    startBtn.disabled = false;
}

// Binary Search implementation (requires sorted array)
async function binarySearch() {
    isAnimating = true;
    startBtn.disabled = true;
    
    // First sort the array
    currentArray.sort((a, b) => a - b);
    renderArray();
    await sleep(500);
    
    const target = currentArray[Math.floor(Math.random() * currentArray.length)];
    alert(`Searching for: ${target} in sorted array`);
    
    let left = 0;
    let right = currentArray.length - 1;
    
    while (left <= right) {
        if (!isAnimating) return;
        
        const mid = Math.floor((left + right) / 2);
        
        highlightElements([mid], 'comparing');
        stats.comparisons++;
        updateStats();
        await sleep(animationSpeed);
        
        if (currentArray[mid] === target) {
            highlightElements([mid], 'sorted');
            alert(`Found ${target} at index ${mid}!`);
            break;
        } else if (currentArray[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
        
        removeHighlights([mid]);
        stats.steps++;
        updateStats();
    }
    
    isAnimating = false;
    startBtn.disabled = false;
}

// Helper functions
function highlightElements(indices, className) {
    indices.forEach(index => {
        const element = document.getElementById(`element-${index}`);
        if (element) {
            element.classList.add(className);
        }
    });
}

function removeHighlights(indices) {
    indices.forEach(index => {
        const element = document.getElementById(`element-${index}`);
        if (element) {
            element.classList.remove('comparing', 'swapping');
        }
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function resetStats() {
    stats = { comparisons: 0, swaps: 0, steps: 0 };
    updateStats();
}

function updateStats() {
    comparisonsEl.textContent = stats.comparisons;
    swapsEl.textContent = stats.swaps;
    stepsEl.textContent = stats.steps;
}

function resetVisualization() {
    isAnimating = false;
    startBtn.disabled = false;
    generateArray();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);