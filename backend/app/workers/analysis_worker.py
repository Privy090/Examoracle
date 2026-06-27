from app.ai.registry import get_provider
from app.services.pattern_recognition_service import PatternRecognitionService
from app.services.prediction_service import PredictionService
from app.services.study_plan_service import StudyPlanService
from app.services.text_extraction_service import TextExtractionService
from app.services.topic_extraction_service import TopicExtractionService


def process_analysis_job(job_id: str, provider_name: str) -> None:
    """Worker entrypoint for queued analysis jobs."""
    text_service = TextExtractionService()
    topic_service = TopicExtractionService()
    pattern_service = PatternRecognitionService()
    prediction_service = PredictionService()
    study_plan_service = StudyPlanService()
    provider = get_provider(provider_name)

    extracted_text = text_service.extract(job_id)
    topics = topic_service.extract_topics(extracted_text)
    pattern_scores = pattern_service.analyze_patterns(job_id, topics)
    insights = provider.generate_insights({"topics": topics, "patterns": pattern_scores})
    prediction = prediction_service.generate_from_job(job_id)
    study_plan_service.generate(prediction["id"])
    _ = insights
