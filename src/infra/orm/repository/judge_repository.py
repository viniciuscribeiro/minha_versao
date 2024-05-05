from sqlalchemy.orm import Session
from src.schemas import schemas
from src.infra.orm.models import models
from typing import List

class JudgeRepository():
    def __init__(self, db: Session):
        self.db = db
    
    def create(self, judge: schemas.JudgeDTO):
        db_judge = models.Judge(
            name=judge.name,
            surname=judge.surname,
            email=judge.email,
            password=judge.password,
            country=judge.country,
            certification_level=judge.certification_level,
            arbitration_category=judge.arbitration_category,
            associated_matches=judge.associated_matches
        )
        self.db.add(db_judge)
        self.db.commit()
        return db_judge

    def get_judges(self):
        judges = self.db.query(models.Judge).all()
        judgesPublic: List[scheams.JudgePublicDTO] = list()
        for judge in judges:
            judgesPublic.append(
                schemas.JudgePublicDTO(
                    id=judge.id,
                    name=judge.name,
                    surname=judge.surname,
                    email=judge.email,
                    country=judge.country,
                    certification_level=judge.certification_level,
                    arbitration_category=judge.arbitration_category,
                    associated_matches=judge.associated_matches
                )
            )
        return judgesPublic

    def delete_judge(self, judge_id: int):
        judge = self.db.query(models.Judge).filter(models.Judge.id == judge_id).first()
        if judge:
            self.db.delete(judge)
            self.db.commit()
            return judge
        return None

    def update_judge(self, judge_id: int, judge: schemas.JudgeDTO):
        db_judge = self.db.query(models.Judge).filter(models.Judge.id == judge_id).first()
        if db_judge:
            for attr, value in judge.dict().items():
                setattr(db_judge, attr, value) if value else None
            self.db.commit()
            return db_judge
        return None
    
    def get_judge(self, judge_id: int):
        judge = self.db.query(models.Judge).filter(models.Judge.id == judge_id).first()
        judgePublic = schemas.JudgePublicDTO(
            id=judge.id,
            name=judge.name,
            surname=judge.surname,
            email=judge.email,
            country=judge.country,
            certification_level=judge.certification_level,
            arbitration_category=judge.arbitration_category,
            associated_matches=judge.associated_matches
        )
        return judgePublic