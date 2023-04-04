
# hemolytic_peptide

* Các peptit kháng khuẩn (AMP) được biết đến với khả năng chống lại các virut, vi khuẩn, nấm và các tế bào ung thư. Tuy nhiên các peptit kháng khuẩn dễ bị tán huyết, gây ra các thời gian sống ngắn của các peptit này. Người ta dự đoán 70% các peptit kháng khuẩn có tính tán huyết cao hoặc trung bình. Do vậy việc tìm hiểu các peptit có đặc tính tán huyết thấp hoặc không tán huyết là cần thiết.
* Bài toán tiếp cận bằng cách trích xuất các tính năng dựa vào các đặc tính của peptit:
    - axitamin composition (AAC)
    - dipeptided composition (DPC)
    - group axitamin composition (GAC)
    - composition-transition-distribution (CTD)
    - axitamin binary (AAB)
    - axitamin index (AAI)
* Sau đó sử dụng các thuật toán học máy để phân loại peptit tán huyết hoặc không tán huyết.
* Bộ dữ liệu sử dụng có định dạng .fansta bao gồm 433 peptit tán huyết và 423 peptit không tán huyết.
* Sử dụng các đặc tính để tính toán và chuyển dữ liệu về định dạng .csv
* Thực thi các file AAB.ipynb, AAC.ipynb, AAI.ipynb, CTD.ipynd, DPC.ipynb, GAC.ipynb trên google_colab để trích xuất các đặc trưng sang file .csv.
* Thực thi file train_model_Bio.ipynb trên google_colab để thực hiện dự đoán các peptit tán huyết.
