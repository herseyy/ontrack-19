from fastapi import APIRouter, Depends, status, HTTPException, Response
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from .. import schemas, models, utils, oauth2, database

router = APIRouter(tags=['Authentication'])

def gt_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# @router.post('/login')
# def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.gt_db)):

#     user = db.query(models.User).filter(
#         models.User.username == user_credentials.username).first()


#     hashed_password = utils.hash(user_credentials.password)
#     # print(user.username)
#     # print(user.hashed_password)

#     print(hashed_password)
#     print(user_credentials.password)

#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")

#     if not utils.verify(user_credentials.password, user.hashed_password):
#         raise HTTPException(
#             status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")

#     # create a token
#     # return token

#     access_token = oauth2.create_access_token(data={"user_id": user.id})

#     return {"access_token": access_token, "token_type": "bearer"}
#     # return ""