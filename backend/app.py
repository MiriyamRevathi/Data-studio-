"""
DATA AI STUDIO - Complete Local Data Analytics & Visualization Engine
Zero external API calls. Runs 100% locally with Python.
"""
from __future__ import annotations

import sys
import os
import io
import csv
import json
import math
import statistics
import re
from typing import Dict, Any, List, Optional, Tuple

# Resolve data directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "data")
if not os.path.exists(DATA_DIR):
    DATA_DIR = os.path.abspath("data")

SEED_DATASETS = {
    "sales": {
        "id": "sales",
        "name": "Sales Dataset",
        "filename": "sales.csv",
        "description": "Retail transaction records detailing products, categories, regions, revenues, and profit margins.",
        "task": "Financial & Retail Performance"
    },
    "students": {
        "id": "students",
        "name": "Students Dataset",
        "filename": "students.csv",
        "description": "Academic records tracking study hours, attendance, subject marks, and final score achievement.",
        "task": "Academic & Education Analytics"
    },
    "employees": {
        "id": "employees",
        "name": "Employees Dataset",
        "filename": "employees.csv",
        "description": "Workforce HR metrics including department, experience, annual salary, and performance ratings.",
        "task": "Human Resources & Workforce"
    },
    "customers": {
        "id": "customers",
        "name": "Customers Dataset",
        "filename": "customers.csv",
        "description": "Customer purchase volumes, regional demographics, total spending history, and satisfaction ratings.",
        "task": "Customer Behavior & Segmentation"
    },
    "products": {
        "id": "products",
        "name": "Products Dataset",
        "filename": "products.csv",
        "description": "Inventory catalog metrics detailing prices, units sold, total revenues, and customer review scores.",
        "task": "Inventory & Product Catalog"
    }
}

# Session store for locally uploaded CSVs
SESSION_DATASETS: Dict[str, Dict[str, Any]] = {}

def get_system_status() -> Dict[str, Any]:
    return {
        "app_name": "DATA AI STUDIO",
        "status": "ready",
        "local_mode": True,
        "external_api_dependent": False,
        "python_version": sys.version.split()[0],
        "engine": "Python Local Data Engine (Pandas & Stats)",
        "seed_datasets_count": len(SEED_DATASETS)
    }

def read_csv_records(filepath_or_content: str, is_content: bool = False) -> Tuple[List[str], List[Dict[str, Any]]]:
    """Reads CSV from file or raw string, returning (columns, records)."""
    if is_content:
        f = io.StringIO(filepath_or_content.strip())
    else:
        if not os.path.exists(filepath_or_content):
            return [], []
        f = open(filepath_or_content, "r", encoding="utf-8-sig")

    try:
        reader = csv.reader(f)
        try:
            raw_headers = next(reader)
        except StopIteration:
            return [], []

        columns = [h.strip() for h in raw_headers if h.strip()]
        records = []
        for row in reader:
            if not row or all(c.strip() == "" for c in row):
                continue
            rec = {}
            for idx, col in enumerate(columns):
                val_str = row[idx].strip() if idx < len(row) else ""
                # Parse types intelligently
                if val_str == "" or val_str.lower() in ["null", "none", "nan", "na"]:
                    rec[col] = None
                else:
                    # Try int
                    try:
                        rec[col] = int(val_str)
                        continue
                    except ValueError:
                        pass
                    # Try float
                    try:
                        rec[col] = float(val_str)
                        continue
                    except ValueError:
                        pass
                    # String
                    rec[col] = val_str
            records.append(rec)
        return columns, records
    finally:
        f.close()

def get_dataset_list() -> List[Dict[str, Any]]:
    """Returns metadata for all available seed and session datasets."""
    datasets = []
    for d_id, info in SEED_DATASETS.items():
        filepath = os.path.join(DATA_DIR, info["filename"])
        columns, records = read_csv_records(filepath)
        datasets.append({
            "id": d_id,
            "name": info["name"],
            "filename": info["filename"],
            "description": info["description"],
            "task": info["task"],
            "rows": len(records),
            "columns": columns,
            "is_seed": True
        })

    for s_id, s_info in SESSION_DATASETS.items():
        datasets.append({
            "id": s_id,
            "name": s_info.get("name", s_id),
            "filename": s_info.get("filename", f"{s_id}.csv"),
            "description": s_info.get("description", "Uploaded custom CSV dataset"),
            "task": "Custom Analysis",
            "rows": len(s_info.get("records", [])),
            "columns": s_info.get("columns", []),
            "is_seed": False
        })

    return datasets

def load_dataset_records(dataset_id: str) -> Tuple[str, str, List[str], List[Dict[str, Any]]]:
    """Loads records and metadata for the given dataset ID."""
    if dataset_id in SESSION_DATASETS:
        info = SESSION_DATASETS[dataset_id]
        return info["name"], info["description"], info["columns"], info["records"]

    if dataset_id in SEED_DATASETS:
        info = SEED_DATASETS[dataset_id]
        filepath = os.path.join(DATA_DIR, info["filename"])
        cols, recs = read_csv_records(filepath)
        return info["name"], info["description"], cols, recs

    # Default fallback to sales
    info = SEED_DATASETS["sales"]
    filepath = os.path.join(DATA_DIR, info["filename"])
    cols, recs = read_csv_records(filepath)
    return info["name"], info["description"], cols, recs

def detect_types(columns: List[str], records: List[Dict[str, Any]]) -> Dict[str, List[str]]:
    """Accurately classifies columns into numeric, categorical, date, and boolean."""
    numeric_cols = []
    categorical_cols = []
    date_cols = []
    boolean_cols = []

    date_regex = re.compile(r'^\d{4}[-/]\d{1,2}[-/]\d{1,2}')

    for col in columns:
        vals = [r[col] for r in records if r[col] is not None]
        if not vals:
            categorical_cols.append(col)
            continue

        # Check numeric
        is_num = all(isinstance(v, (int, float)) for v in vals)
        if is_num:
            numeric_cols.append(col)
            continue

        # Check date
        str_vals = [str(v) for v in vals]
        col_lower = col.lower()
        has_date_keyword = any(w in col_lower for w in ["date", "time", "year", "month", "day"])
        sample_matches_date = sum(1 for s in str_vals[:10] if date_regex.match(s))
        if has_date_keyword or sample_matches_date >= min(len(str_vals), 5):
            date_cols.append(col)
            continue

        # Check boolean
        unique_lower = {str(v).lower() for v in vals}
        if unique_lower.issubset({"true", "false", "yes", "no", "0", "1"}):
            boolean_cols.append(col)
            continue

        categorical_cols.append(col)

    return {
        "numeric": numeric_cols,
        "categorical": categorical_cols,
        "date": date_cols,
        "boolean": boolean_cols
    }

def calculate_quality_and_outliers(columns: List[str], records: List[Dict[str, Any]], col_types: Dict[str, List[str]]) -> Dict[str, Any]:
    """Calculates missing values, duplicate rows, and IQR outliers."""
    total_rows = len(records)
    total_cols = len(columns)

    # Missing counts
    missing_list = []
    for col in columns:
        missing_count = sum(1 for r in records if r.get(col) is None or str(r.get(col)).strip() == "")
        pct = round((missing_count / total_rows * 100) if total_rows > 0 else 0, 2)
        missing_list.append({
            "column": col,
            "missing_count": missing_count,
            "missing_percentage": pct
        })

    # Duplicates check
    seen = set()
    dup_count = 0
    for r in records:
        row_tuple = tuple(str(r.get(c)) for c in columns)
        if row_tuple in seen:
            dup_count += 1
        else:
            seen.add(row_tuple)

    # Outliers calculation using IQR method (Q1 - 1.5*IQR, Q3 + 1.5*IQR)
    outliers_list = []
    for col in col_types["numeric"]:
        vals = sorted([float(r[col]) for r in records if r.get(col) is not None and isinstance(r[col], (int, float))])
        n = len(vals)
        if n >= 4:
            q1 = vals[int(math.floor(n * 0.25))]
            q3 = vals[int(math.floor(n * 0.75))]
            iqr = q3 - q1
            lower_bound = q1 - 1.5 * iqr
            upper_bound = q3 + 1.5 * iqr
            outlier_count = sum(1 for v in vals if v < lower_bound or v > upper_bound)
            outliers_list.append({
                "column": col,
                "outlier_count": outlier_count,
                "outlier_percentage": round((outlier_count / n * 100), 2),
                "lower_bound": round(lower_bound, 2),
                "upper_bound": round(upper_bound, 2)
            })
        else:
            outliers_list.append({
                "column": col,
                "outlier_count": 0,
                "outlier_percentage": 0.0,
                "lower_bound": 0.0,
                "upper_bound": 0.0
            })

    return {
        "total_rows": total_rows,
        "total_columns": total_cols,
        "duplicate_rows": dup_count,
        "missing_values": missing_list,
        "outliers": outliers_list,
        "numeric_count": len(col_types["numeric"]),
        "categorical_count": len(col_types["categorical"]),
        "date_count": len(col_types["date"]),
        "boolean_count": len(col_types["boolean"])
    }

def calculate_stats(columns: List[str], records: List[Dict[str, Any]], col_types: Dict[str, List[str]]) -> Dict[str, Any]:
    """Calculates summary statistics for numeric and categorical columns."""
    stats = {
        "numeric": {},
        "categorical": {}
    }

    # Numeric stats
    for col in col_types["numeric"]:
        vals = [float(r[col]) for r in records if r.get(col) is not None and isinstance(r[col], (int, float))]
        if vals:
            sorted_vals = sorted(vals)
            n = len(vals)
            mean_val = sum(vals) / n
            median_val = statistics.median(vals)
            min_val = sorted_vals[0]
            max_val = sorted_vals[-1]
            std_val = statistics.stdev(vals) if n > 1 else 0.0
            q25 = sorted_vals[int(math.floor(n * 0.25))]
            q75 = sorted_vals[int(math.floor(n * 0.75))]

            stats["numeric"][col] = {
                "count": n,
                "mean": round(mean_val, 3),
                "median": round(median_val, 3),
                "min": round(min_val, 3),
                "max": round(max_val, 3),
                "std": round(std_val, 3),
                "q25": round(q25, 3),
                "q75": round(q75, 3)
            }

    # Categorical stats
    for col in col_types["categorical"] + col_types["date"]:
        vals = [str(r[col]) for r in records if r.get(col) is not None and str(r[col]).strip() != ""]
        if vals:
            counts = {}
            for v in vals:
                counts[v] = counts.get(v, 0) + 1
            sorted_items = sorted(counts.items(), key=lambda x: x[1], reverse=True)
            top_val, top_freq = sorted_items[0]
            stats["categorical"][col] = {
                "unique_values": len(counts),
                "most_frequent": top_val,
                "frequency": top_freq,
                "frequency_percentage": round((top_freq / len(vals) * 100), 1)
            }

    return stats

def calculate_pearson_correlations(records: List[Dict[str, Any]], numeric_cols: List[str]) -> Dict[str, Any]:
    """Calculates Pearson correlation matrix and top pairs."""
    if len(numeric_cols) < 2:
        return {"matrix": {}, "pairs": []}

    matrix = {c: {} for c in numeric_cols}
    pairs = []

    # Pre-extract vectors
    vectors = {}
    for c in numeric_cols:
        vectors[c] = [float(r[c]) if (r.get(c) is not None and isinstance(r[c], (int, float))) else None for r in records]

    for i in range(len(numeric_cols)):
        c1 = numeric_cols[i]
        matrix[c1][c1] = 1.0
        for j in range(i + 1, len(numeric_cols)):
            c2 = numeric_cols[j]
            # Valid pairs
            pts = [(vectors[c1][k], vectors[c2][k]) for k in range(len(records)) if vectors[c1][k] is not None and vectors[c2][k] is not None]
            if len(pts) >= 3:
                x = [p[0] for p in pts]
                y = [p[1] for p in pts]
                n = len(pts)
                mx = sum(x) / n
                my = sum(y) / n
                numer = sum((xi - mx) * (yi - my) for xi, yi in zip(x, y))
                denom = math.sqrt(sum((xi - mx)**2 for xi in x) * sum((yi - my)**2 for yi in y))
                r = round(numer / denom, 3) if denom != 0 else 0.0
            else:
                r = 0.0

            matrix[c1][c2] = r
            if c2 not in matrix:
                matrix[c2] = {}
            matrix[c2][c1] = r

            pairs.append({
                "col1": c1,
                "col2": c2,
                "correlation": r,
                "strength": "Strong" if abs(r) >= 0.7 else ("Moderate" if abs(r) >= 0.4 else "Weak"),
                "direction": "Positive" if r > 0 else ("Negative" if r < 0 else "Neutral")
            })

    # Sort descending by absolute correlation
    pairs.sort(key=lambda x: abs(x["correlation"]), reverse=True)
    return {"matrix": matrix, "pairs": pairs}

def generate_insights(dataset_name: str, columns: List[str], records: List[Dict[str, Any]], col_types: Dict[str, List[str]], stats: Dict[str, Any], correlations: Dict[str, Any]) -> List[str]:
    """Generates deterministic, mathematically verified insights from actual dataset values."""
    insights = []
    total_rows = len(records)

    # 1. Dataset volume & completeness
    missing_count = sum(sum(1 for col in columns if r.get(col) is None) for r in records)
    if missing_count == 0:
        insights.append(f"The {dataset_name} contains {total_rows:,} verified observations with 100% data integrity and zero missing values across {len(columns)} attributes.")
    else:
        insights.append(f"The {dataset_name} includes {total_rows:,} rows with {missing_count} missing values identified across {len(columns)} attributes.")

    # 2. Domain-specific insights based on present columns
    # Sales
    if "Product" in columns and "Sales" in columns:
        product_sales = {}
        for r in records:
            p = str(r.get("Product"))
            s = float(r.get("Sales", 0) or 0)
            product_sales[p] = product_sales.get(p, 0) + s
        if product_sales:
            top_p, top_val = max(product_sales.items(), key=lambda x: x[1])
            tot = sum(product_sales.values())
            insights.append(f"Top revenue generator is '{top_p}' contributing ${top_val:,.2f} ({(top_val/tot*100):.1f}% of ${tot:,.2f} total sales).")

    if "Region" in columns and "Sales" in columns:
        reg_sales = {}
        for r in records:
            reg = str(r.get("Region"))
            s = float(r.get("Sales", 0) or 0)
            reg_sales[reg] = reg_sales.get(reg, 0) + s
        if reg_sales:
            top_reg, top_reg_val = max(reg_sales.items(), key=lambda x: x[1])
            insights.append(f"Region '{top_reg}' leads overall sales performance with ${top_reg_val:,.2f} in cumulative transaction volume.")

    # Students
    if "Final_Score" in columns:
        fs_stats = stats["numeric"].get("Final_Score")
        if fs_stats:
            insights.append(f"Student final scores average {fs_stats['mean']:.1f}/100 with a median of {fs_stats['median']:.1f} and peak score of {fs_stats['max']:.1f}.")

    if "Attendance" in columns and "Final_Score" in columns:
        # find pair
        pair = next((p for p in correlations.get("pairs", []) if (p["col1"] in ["Attendance", "Final_Score"] and p["col2"] in ["Attendance", "Final_Score"])), None)
        if pair:
            insights.append(f"Student attendance exhibits a {pair['strength'].lower()} positive correlation (r = {pair['correlation']:.3f}) with final academic performance.")

    # Employees
    if "Salary" in columns and "Department" in columns:
        dept_sal = {}
        for r in records:
            d = str(r.get("Department"))
            s = float(r.get("Salary", 0) or 0)
            dept_sal.setdefault(d, []).append(s)
        if dept_sal:
            top_dept, avg_sal = max(((d, sum(vals)/len(vals)) for d, vals in dept_sal.items()), key=lambda x: x[1])
            insights.append(f"The '{top_dept}' department commands the highest average compensation at ${avg_sal:,.0f} per year.")

    if "Experience" in columns and "Salary" in columns:
        pair = next((p for p in correlations.get("pairs", []) if (p["col1"] in ["Experience", "Salary"] and p["col2"] in ["Experience", "Salary"])), None)
        if pair:
            insights.append(f"Years of professional experience strongly predicts salary growth (Pearson r = {pair['correlation']:.3f}).")

    # Customers
    if "Total_Spend" in columns and "Region" in columns:
        reg_spend = {}
        for r in records:
            reg = str(r.get("Region"))
            sp = float(r.get("Total_Spend", 0) or 0)
            reg_spend[reg] = reg_spend.get(reg, 0) + sp
        if reg_spend:
            top_reg, top_sp = max(reg_spend.items(), key=lambda x: x[1])
            insights.append(f"Customers in the '{top_reg}' territory account for the highest cumulative customer expenditure (${top_sp:,.2f}).")

    # Products
    if "Rating" in columns and "Product" in columns:
        prod_ratings = [(str(r.get("Product")), float(r.get("Rating", 0) or 0)) for r in records if r.get("Rating") is not None]
        if prod_ratings:
            top_prod, top_rate = max(prod_ratings, key=lambda x: x[1])
            insights.append(f"Highest-rated inventory offering is '{top_prod}' holding a customer review score of {top_rate:.1f} out of 5.0.")

    # 3. Correlation insights if we have pairs
    for p in correlations.get("pairs", []):
        if len(insights) >= 6:
            break
        if abs(p["correlation"]) >= 0.5:
            text = f"Strong linear relationship detected between '{p['col1']}' and '{p['col2']}' with r = {p['correlation']:.3f} ({p['direction'].lower()} slope)."
            if text not in insights:
                insights.append(text)

    # 4. Dominant categorical insight
    for cat in col_types["categorical"]:
        if len(insights) >= 6:
            break
        c_stats = stats["categorical"].get(cat)
        if c_stats and c_stats["frequency_percentage"] > 25:
            text = f"Attribute '{cat}' is predominantly represented by '{c_stats['most_frequent']}' ({c_stats['frequency_percentage']}% of records)."
            if text not in insights:
                insights.append(text)

    return insights

def get_dataset_details(dataset_id: str) -> Dict[str, Any]:
    """Loads and computes the complete analytics bundle for a dataset."""
    name, desc, columns, records = load_dataset_records(dataset_id)
    if not records:
        return {"error": f"Dataset '{dataset_id}' not found or empty."}

    col_types = detect_types(columns, records)
    quality = calculate_quality_and_outliers(columns, records, col_types)
    stats = calculate_stats(columns, records, col_types)
    correlations = calculate_pearson_correlations(records, col_types["numeric"])
    insights = generate_insights(name, columns, records, col_types, stats, correlations)

    return {
        "id": dataset_id,
        "name": name,
        "description": desc,
        "rows": len(records),
        "columns": columns,
        "column_types": col_types,
        "records": records[:500],
        "quality": quality,
        "statistics": stats,
        "correlations": correlations,
        "insights": insights
    }

def process_uploaded_csv(filename: str, csv_content: str) -> Dict[str, Any]:
    """Parses and analyzes an uploaded CSV string locally."""
    if not csv_content or not csv_content.strip():
        return {"error": "Uploaded CSV file is empty. Please select a valid file containing data."}

    columns, records = read_csv_records(csv_content, is_content=True)
    if not columns:
        return {"error": "Could not identify any column headers in the uploaded CSV file."}

    if not records:
        return {"error": "Uploaded CSV has column headers but contains no data rows."}

    clean_name = os.path.splitext(filename)[0].replace("_", " ").title()
    custom_id = f"custom_{len(SESSION_DATASETS) + 1}"

    SESSION_DATASETS[custom_id] = {
        "id": custom_id,
        "name": f"{clean_name} (Uploaded)",
        "filename": filename,
        "description": f"Locally uploaded dataset containing {len(records):,} rows and {len(columns)} columns.",
        "columns": columns,
        "records": records
    }

    return get_dataset_details(custom_id)

def generate_local_chart(params: Dict[str, Any]) -> Dict[str, Any]:
    """Generates chart configuration and aggregation for Bar, Line, Scatter, Histogram, Pie."""
    dataset_id = params.get("dataset", "sales")
    chart_type = params.get("chart_type", "bar")
    x_col = params.get("x_col")
    y_col = params.get("y_col")
    title = params.get("title") or f"{chart_type.title()} Chart"
    bins = int(params.get("bins", 15))
    sort_order = params.get("sort_order", "none")

    _, _, columns, records = load_dataset_records(dataset_id)
    if not records:
        return {"error": f"Dataset '{dataset_id}' not found."}

    chart_data = {}

    if chart_type == "bar":
        if not x_col or not y_col:
            return {"error": "Bar chart requires both an X Axis category and a Y Axis numeric value."}
        # Aggregate mean or sum
        agg = {}
        for r in records:
            x_val = str(r.get(x_col, "Unknown"))
            y_val = r.get(y_col)
            if y_val is not None and isinstance(y_val, (int, float)):
                agg.setdefault(x_val, []).append(float(y_val))

        items = [(k, sum(v)/len(v)) for k, v in agg.items()]
        if sort_order == "asc":
            items.sort(key=lambda x: x[1])
        elif sort_order == "desc":
            items.sort(key=lambda x: x[1], reverse=True)

        chart_data = {
            "x": [i[0] for i in items],
            "y": [round(i[1], 2) for i in items],
            "type": "bar"
        }

    elif chart_type == "line":
        if not x_col or not y_col:
            return {"error": "Line chart requires both an X Axis category/date and a Y Axis numeric value."}
        agg = {}
        for r in records:
            x_val = str(r.get(x_col, "Unknown"))
            y_val = r.get(y_col)
            if y_val is not None and isinstance(y_val, (int, float)):
                agg.setdefault(x_val, []).append(float(y_val))

        items = [(k, sum(v)/len(v)) for k, v in agg.items()]
        # Try sort dates
        try:
            items.sort(key=lambda x: x[0])
        except Exception:
            pass

        chart_data = {
            "x": [i[0] for i in items],
            "y": [round(i[1], 2) for i in items],
            "type": "line"
        }

    elif chart_type == "scatter":
        if not x_col or not y_col:
            return {"error": "Scatter plot requires two numeric columns for X and Y axes."}
        pts = []
        for r in records:
            xv = r.get(x_col)
            yv = r.get(y_col)
            if xv is not None and yv is not None and isinstance(xv, (int, float)) and isinstance(yv, (int, float)):
                pts.append((float(xv), float(yv)))

        chart_data = {
            "x": [p[0] for p in pts],
            "y": [p[1] for p in pts],
            "type": "scatter"
        }

    elif chart_type == "histogram":
        col = x_col or y_col
        if not col:
            return {"error": "Histogram requires a numeric column."}
        vals = [float(r[col]) for r in records if r.get(col) is not None and isinstance(r[col], (int, float))]
        chart_data = {
            "x": vals,
            "bins": bins,
            "type": "histogram"
        }

    elif chart_type == "pie":
        if not x_col:
            return {"error": "Pie chart requires a category column."}
        agg = {}
        for r in records:
            x_val = str(r.get(x_col, "Unknown"))
            if y_col and r.get(y_col) is not None and isinstance(r[y_col], (int, float)):
                agg[x_val] = agg.get(x_val, 0) + float(r[y_col])
            else:
                agg[x_val] = agg.get(x_val, 0) + 1

        items = sorted(agg.items(), key=lambda x: x[1], reverse=True)[:10]
        chart_data = {
            "labels": [i[0] for i in items],
            "values": [round(i[1], 2) for i in items],
            "type": "pie"
        }

    return {
        "status": "success",
        "chart_type": chart_type,
        "title": title,
        "data": chart_data
    }

def clear_temporary_data() -> Dict[str, Any]:
    """Clears uploaded custom datasets from memory."""
    SESSION_DATASETS.clear()
    return {"status": "cleared", "remaining": 0}

# Register Enterprise analytics modules
try:
    from backend.enterprise import *
except ImportError:
    try:
        from enterprise import *
    except ImportError:
        pass
