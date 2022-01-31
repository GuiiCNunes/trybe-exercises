# import json

# #Pratica 1
# import csv


# class SalesReport():
#     def __init__(self, export_file):
#         self.export_file = export_file + '.json'
#         #Pratica 1
#         self.csv_file = export_file + '.csv'

#     def build(self):
#         """ Aqui colocamos a lógica para a entidade 'se criar',
#         ou seja, criar um relatório imprimível. Por simplicidade,
#         vamos omitir essa lógica nos exemplos! """
#         return [{
#                 'Coluna 1': 'Dado 1',
#                 'Coluna 2': 'Dado 2',
#                 'Coluna 3': 'Dado 3'
#                 },
#                 {
#                 'Coluna 1': 'Dado A',
#                 'Coluna 2': 'Dado B',
#                 'Coluna 3': 'Dado C'
#                 }]

#     def serialize(self):
#         # Vamos gerar, aqui, o nosso relatório em formato JSON
#         with open(self.export_file, 'w') as file:
#             json.dump(self.build(), file)

#     #Pratica 1
#     def build_csv(self):
#       headers = ["Coluna 1", "Coluna 2", "Coluna 3"]
#       row_1 = ["Dado 1", "Dado 2","Dado 3"]
#       row_2 = ["Dado A", "Dado B", "Dado C"]
#       return [headers, row_1, row_2]


#     def serialize_csv(self):
#         with open(self.csv_file, 'w') as file:
#           writer = csv.writer(file)
#           for row in self.build_csv():
#             writer.writerow(row)


# ---------------------------------------------------------------------------------------------------------------------------
# from abc import ABC, abstractmethod
# import json
# import csv


# class SalesReport(ABC):
#     def __init__(self, export_file):
#         self.export_file = export_file

#     def build(self):
#         return [{
#                 'Coluna 1': 'Dado 1',
#                 'Coluna 2': 'Dado 2',
#                 'Coluna 3': 'Dado 3'
#                 },
#                 {
#                 'Coluna 1': 'Dado A',
#                 'Coluna 2': 'Dado B',
#                 'Coluna 3': 'Dado C'
#                 }]

#     @abstractmethod
#     def serialize(self):
#         raise NotImplementedError

#     @abstractmethod
#     def get_length(self):
#         raise NotImplementedError  


# class SalesReportJSON(SalesReport):
#     def serialize(self):
#         with open(self.export_file + '.json', 'w') as file:
#             json.dump(self.build(), file)


# class SalesReportCSV(SalesReport):
#       def serialize(self):
#         with open(self.export_file + '.csv', 'w') as file:
#           header = ["Coluna 1", "Coluna 2", "Coluna 3"]
#           writer = csv.DictWriter(file, fieldnames=header)
#           for row in self.build():
#             writer.writerow(row)

# ---------------------------------------------------------------------------------------------------------------------------

from abc import ABC, abstractmethod
import gzip
import json


class SalesReport(ABC):
    def __init__(self, export_file):
        self.export_file = export_file

    def build(self):
        return [{
                'Coluna 1': 'Dado 1',
                'Coluna 2': 'Dado 2',
                'Coluna 3': 'Dado 3'
                },
                {
                'Coluna 1': 'Dado A',
                'Coluna 2': 'Dado B',
                'Coluna 3': 'Dado C'
                }]

    def compress(self):
        binary_content = json.dumps(self.build()).encode('utf-8')

        with gzip.open(self.export_file + '.gz', 'wb') as compressed_file:
            compressed_file.write(binary_content)

    @abstractmethod
    def serialize(self):
        raise NotImplementedError


class SalesReportJSON(SalesReport):
    def serialize(self):
        with open(self.export_file + '.json', 'w') as file:
            json.dump(self.build(), file)

class SalesReportCSV(SalesReport):
    # Sua implementação vai aqui
    pass

# ---------------------------------------------------------------------------------------------------------------------------
# ---------------------------------------------------------------------------------------------------------------------------
# ---------------------------------------------------------------------------------------------------------------------------