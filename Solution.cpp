
#include <vector>
#include <unordered_map>
using namespace std;

class RangeFreqQuery {
    
    unordered_map<int, vector<int>>mapValueToIndexes;
    
public:
    explicit RangeFreqQuery(const vector<int>& input) {
        for (int i = 0; i < input.size(); ++i) {
            mapValueToIndexes[input[i]].push_back(i);
        }
    }

    int query(int start, int end, int value) {

        //C++20: mapValueToIndexes.contains(value), done the old way for compatibility.
        if (mapValueToIndexes.find(value) == mapValueToIndexes.end()) {
            return 0;
        }
        int indexStart = binarySearchBoundary(mapValueToIndexes[value], start, true);
        int indexEnd = binarySearchBoundary(mapValueToIndexes[value], end, false);
        return indexEnd - indexStart + 1;
    }

private:
    int binarySearchBoundary(const vector<int>& listIndexes, int target, bool upperBoundSearch) const {
        int left = 0;
        int right = listIndexes.size() - 1;

        while (left <= right) {
            int middle = left + (right - left) / 2;
            if (listIndexes[middle] == target) {
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
};
