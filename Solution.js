
class RangeFreqQuery {

    /**
     * @param {number[]} input
     */
    constructor(input) {
        this.mapValueToIndexes = new Map();//Map<number, number[]> 
        for (let i = 0; i < input.length; ++i) {
            if (!this.mapValueToIndexes.has(input[i])) {
                this.mapValueToIndexes.set(input[i], []);
            }
            this.mapValueToIndexes.get(input[i]).push(i);
        }
    }

    /** 
     * @param {number} start 
     * @param {number} end 
     * @param {number} value
     * @return {number}
     */
    query(start, end, value) {
        if (!this.mapValueToIndexes.has(value)) {
            return 0;
        }
        let indexStart = this.binarySearchBoundary(this.mapValueToIndexes.get(value), start, true);
        let indexEnd = this.binarySearchBoundary(this.mapValueToIndexes.get(value), end, false);
        return indexEnd - indexStart + 1;
    }

    /** 
     * @param {number} listIndexes 
     * @param {number} target 
     * @param {boolean} upperBoundSearch
     * @return {number}
     */
    binarySearchBoundary(listIndexes, target, upperBoundSearch) {
        let left = 0;
        let right = listIndexes.length - 1;

        while (left <= right) {
            let middle = left + Math.floor((right - left) / 2);
            if (listIndexes[middle] === target) {
                return middle;
            }
            if (listIndexes[middle] < target) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return upperBoundSearch ? left : right;
    }
}
