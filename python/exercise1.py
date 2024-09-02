print(list(range(10)))


def in_range(nums, lowest, highest):
    for num in nums:
        if num >= lowest and num <= highest:
            print(f"{num} fits")


in_range([5, 10, 15, 20, 25], 7, 23)


def sum_nums(nums):
      total = 0
      for num in nums:
            total = total + num

      return total


print("sum_nums returned", sum_nums([2, 4, 6, 8]))


def any7(nums):
      for num in nums:
          if num == 7:
            return True

      return False


print("should be true", any7([1, 2, 4, 7, 8, 9]))
print("should be false", any7([1, 3, 5, 9, 11]))


def convert_temp(unit_in, unit_out, temp):
      if unit_in != "f" and unit_in != "c":
        return f"Invalid unit {unit_in}"

      if unit_out != "f" and unit_out != "c":
        return f"Invalid unit {unit_out}"

      if unit_in == "f" and unit_out == "c":
        temp = (temp - 32) / 9 * 5

      if unit_in == "c" and unit_out == "f":
        temp = (temp * 5 / 9) + 32

        return temp


print("c", "f", 0, convert_temp("c", "f", 0), "should be 32.0")
print("f", "c", 212, convert_temp("f", "c", 212), "should be 100.0")
print("z", "f", 32, convert_temp("z", "f", 32), "should be Invalid unit z")
print("c", "z", 32, convert_temp("c", "z", 32), "should be Invalid unit z")
print("f", "f", 75.5, convert_temp("f", "f", 75.5), "should be 75.5")

   


