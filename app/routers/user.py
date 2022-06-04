from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from .. import models, schemas, utils, database


router = APIRouter(
    prefix="/users",
    tags=['Users']
)

# /users/
# /users



# @router.post("/", status_code=status.HTTP_201_CREATED)
# def create_user(user: schemas.UserCreate, db: Session = Depends(database.gt_db)):

#     # hash the password - user.password
#     hashed_password = utils.hash(user.password)
#     user.password = hashed_password
#     print(user.password)

#     new_user = models.User(
#         username = user.username,
#         hashed_password = user.password
#         )
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)

#     return new_user


# @router.get('/{id}')
# def get_user(id: int, db: Session = Depends(database.gt_db), ):
#     user = db.query(models.User).filter(models.User.id == id).first()
#     if not user:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail=f"User with id: {id} does not exist")

#     return user