


o = ['(', '[', '{', '<']
c = [')', ']', '}', '>']
numbers = []
counter = 0
steps = 0

def check(chain, len_count):
    global counter, steps
    steps += 1

    if counter != 'BLOCK':
        if len(numbers) == 0:
            if chain == '(' or chain == '[' or chain == '{' or chain =='<':
                numbers.append(o.index(chain))
                return 'YES'
            else:
                numbers.clear()
                counter = 'BLOCK'
                return 'INVALID'
                    
        if len(numbers) > 0:
            if chain == '(' or chain == '[' or chain == '{' or chain =='<':
                numbers.append(o.index(chain))
                return 'OK'
            elif chain == ')' or chain == ']' or chain == '}' or chain =='>':
                if c.index(chain) == numbers[-1]:
                    del numbers[-1]
                    if len(numbers) == 0:
                        counter += 1
                        return 'YES' + str(f'{counter}')
                    else:
                        return 'OK'
                else:
                    numbers.clear()
                    counter = 'BLOCK'
                    return 'INVALID'
    if counter == 'BLOCK':
        return 'BLOCK'

def reset(len_count):
    global steps, counter
    if steps >= len_count:
        counter = 0
        numbers.clear()
        steps = 0




