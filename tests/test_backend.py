import unittest
import math

class TestBackendAnalytics(unittest.TestCase):
    def test_summary_statistics(self):
        data = [12.0, 15.0, 18.0, 22.0, 30.0]
        mean_val = sum(data) / len(data)
        self.assertEqual(mean_val, 19.4)

    def test_missing_values_detection(self):
        records = [
            {"colA": 10, "colB": None},
            {"colA": 20, "colB": "Active"},
            {"colA": None, "colB": "Pending"}
        ]
        missing_count = sum(1 for r in records if r["colB"] is None)
        self.assertEqual(missing_count, 1)

    def test_pearson_correlation(self):
        x = [1, 2, 3, 4, 5]
        y = [5, 4, 3, 2, 1]
        n = len(x)
        mx = sum(x) / n
        my = sum(y) / n
        num = sum((x[i] - mx) * (y[i] - my) for i in range(n))
        den = math.sqrt(sum((x[i] - mx)**2 for i in range(n)) * sum((y[i] - my)**2 for i in range(n)))
        r = num / den
        self.assertTrue(abs(r - (-1.0)) < 1e-5)

if __name__ == '__main__':
    unittest.main()
