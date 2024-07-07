import { zodResolver } from '@hookform/resolvers/zod';
import { PageIndicator } from 'antd-mobile';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

import AdditionalForm from '@/components/additional-form';
import BasicInformationForm from '@/components/basic-information-form';
import ContactInformationForm from '@/components/contact-information-form';
import FaithBackgroundForm from '@/components/faith-background-form';
import FamilyForm from '@/components/family-form';
import ParticipationForm from '@/components/participation-form';
import ProfileToken from '@/components/profile-token.jsx';
import SkillForm from '@/components/skill-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useFormStore } from '@/store/form-store';
import { useUserStore } from '@/store/user-store.js';

const Page = ({ children }) => {
  return (
    <div className="snap-always snap-center">
      <div className={`relative min-h-screen flex`}>{children}</div>
    </div>
  );
};

const FullPage = ({ children, className, ...props }) => {
  return (
    <div
      className={`snap-y snap-mandatory overflow-y-scroll h-screen flex-grow z-0 ${className ?? ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

const formSchema = z.object({
  basic: z.object({
    nameEN: z.string(),
    nameCN: z.string(),
    gender: z.string(),
    dob: z.date(),
    industry: z.string(),
    industryOther: z.string().optional(),
  }),
  contact: z.object({
    phone: z.string(),
    ic: z.string().optional(),
    address: z.string().optional(),
  }),
  faith: z.object({
    isChristian: z.boolean(),
    baptismStatus: z.string().optional(),
    regularChurch: z.boolean().optional(),
  }),
  participation: z.object({
    interest: z.string().optional(),
    interestOther: z.string().optional(),
  }),
  skill: z.object({
    interest: z.string().optional(),
    interestOther: z.string().optional(),
  }),
  family: z.object({
    anyIsChristian: z.boolean().optional(),
  }),
  additional: z.object({
    methodOfEngagement: z.string().optional(),
    methodOfEngagementOther: z.string().optional(),
    usageConsent: z.boolean(),
  }),
});

const id = 'full-page';
const pageIds = ['basic', 'contact', 'faith', 'participation', 'skill', 'family', 'additional'];

export default function Index() {
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [UID, language] = useUserStore((state) => [state.UID, state.language]);
  const { t } = useTranslation();

  const setForm = useFormStore((state) => state.setForm);
  const form = useForm({ resolver: zodResolver(formSchema) });
  const onSubmit = (values) => {
    console.log('submitted', values);
    alert('Thanks for the registration!');
  };

  useEffect(() => {
    const root = document.querySelector(`#${id}`);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.length < 2 || entries[0].intersectionRatio === 1) return;

        if (entries[0].intersectionRatio > 0.5) setPage((page) => page - 1);
        if (entries[1].intersectionRatio > 0.5) {
          setPage((page) => page + (entries.length - 1));
          form.trigger();
        }
      },
      { root, threshold: 0.5 },
    );
    for (const node of root.childNodes) observer.observe(node);
    setTotalPage(root.childNodes.length);
  }, []);

  useEffect(() => setForm(form), [form]);

  return (
    <>
      <ProfileToken />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FullPage id={id} className="text-neutral-900 px-8">
            <Page>
              <BasicInformationForm id={pageIds[0]} />
            </Page>
            <Page>
              <ContactInformationForm id={pageIds[1]} />
            </Page>
            <Page>
              <FaithBackgroundForm id={pageIds[2]} />
            </Page>
            <Page>
              <ParticipationForm id={pageIds[3]} />
            </Page>
            <Page>
              <SkillForm id={pageIds[4]} />
            </Page>
            <Page>
              <FamilyForm id={pageIds[5]} />
            </Page>
            <Page>
              <AdditionalForm id={pageIds[6]} />
            </Page>
          </FullPage>

          <PageIndicator
            total={totalPage}
            current={page}
            className="fixed bottom-4 left-1/2 -translate-x-1/2"
            color="primary"
            style={{ '--active-dot-color': '#171717' }}
          />
          {page + 1 === totalPage && (
            <Button type="submit" className="fixed bottom-4 right-4" size="sm">
              Submit
            </Button>
          )}
        </form>
      </Form>
    </>
  );
}
