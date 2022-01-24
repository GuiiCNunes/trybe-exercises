reproves = []

with open("students.txt", "r") as file:
  for line in file:
    l = line.split(" ")
    if int(l[1]) < 6:
      reproves.append(l[0])

with open("reproves.txt", "w") as file:
  for reprove in reproves:
    print(reprove, file=file)
