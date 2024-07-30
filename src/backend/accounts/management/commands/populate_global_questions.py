from django.core.management.base import BaseCommand
from screening_test.models import GlobalScreeningTestQuestions

class Command(BaseCommand):
    help = 'Populate the database with global screening test questions'

    def handle(self, *args, **kwargs):
        questions = [
            "How many years of experience you have?",
            "What is your monthly expected salary?",
            "What is your highest level of education?",
            "Are you willing to relocate?",
            "What are your technical skills?",
            "Describe your last job role.",
            "Why are you interested in this job?",
            "What are your strengths and weaknesses?",
            "Where do you see yourself in 5 years?",
            "What are your salary expectations?",
            "How do you handle stress and pressure?",
            "Do you prefer working in a team or alone?",
            "What is your availability to start?",
            "Do you have any certifications?",
            "Describe a challenging project you worked on."
        ]

        for question in questions:
            GlobalScreeningTestQuestions.objects.create(question=question)
            self.stdout.write(self.style.SUCCESS(f'Successfully added question: "{question}"'))

        self.stdout.write(self.style.SUCCESS('Successfully populated global screening test questions.'))
