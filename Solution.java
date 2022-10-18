
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RangeFreqQuery {

    Map<Integer, List<Integer>> mapValueToIndexes;

    public RangeFreqQuery(int[] input) {
        mapValueToIndexes = new HashMap<>();
        for (int i = 0; i < input.length; ++i) {
            mapValueToIndexes.putIfAbsent(input[i], new ArrayList<>());
            mapValueToIndexes.get(input[i]).add(i);
        }
    }

    public int query(int start, int end, int value) {
        if (!mapValueToIndexes.containsKey(value)) {
            return 0;
        }
        int indexStart = binarySearchBoundary(mapValueToIndexes.get(value), start, true);
        int indexEnd = binarySearchBoundary(mapValueToIndexes.get(value), end, false);
        return indexEnd - indexStart + 1;
    }

    private int binarySearchBoundary(List<Integer> listIndexes, int target, boolean upperBoundSearch) {
        int left = 0;
        int right = listIndexes.size() - 1;

        while (left <= right) {
            int middle = left + (right - left) / 2;
            if (listIndexes.get(middle) == target) {
                return middle;
            }
            if (listIndexes.get(middle) < target) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return upperBoundSearch ? left : right;
    }
}
