"""
Script for debugging purposes. Set one of the request's argument to true.
One argument is needed: the position of the field which has to be set to true.
"""
import sys

# request string without trailing token and leading 'f.req='
req: str = '%5B%5Bsubme%2Csubme%2Csubme%2Csubme%5D%2C%5Bsubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2C%5Bsubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2C%5Bsubme%2Csubme%5D%2Csubme%2C%5Bsubme%5D%2Csubme%2Csubme%2Csubme%2Csubme%5D%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2C%5Bsubme%2Csubme%2Csubme%5D%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2C%5Bsubme%2Csubme%5D%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2C%5Bsubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%5D%2C%5Bsubme%2Csubme%2Csubme%2Csubme%2Csubme%2Csubme%5D%2C%5Bsubme%2Csubme%2Csubme%5D%2C%5Bsubme%2Csubme%2Csubme%5D%2Csubme%2Csubme%5D%2C%5Bsubme%2C%5B%5B%2240220341253%22%5D%5D%2C%5B%5D%2C%5B%5D%2Csubme%2C%5B%5D%2C%5B%5D%5D%5D'

def main():
    global req
    n: int = int(sys.argv[1])
    i: int = 0
    while "subme" in req:
        if i != n:
            req = req.replace("subme", "null", 1)
        else:
            req = req.replace("subme", "true", 1)
        i += 1
    print(req)

if __name__ == "__main__":
    main()
