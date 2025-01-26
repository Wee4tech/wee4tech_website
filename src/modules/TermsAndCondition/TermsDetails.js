import React from "react";
import { Collapse, Typography} from "antd";
const TermsDetails = () => {
 
  const items = [
    {
        key: '1',
        label: 'MASTER SAAS AND SERVICES AGREEMENT',
        children: <p>This Master SaaS and Services Subscription Agreement (this “Master Subscription Agreement”) is entered into by and between Mad Over Buildings Private Limited (“MOB”), a company incorporated under the provisions of the Indian Companies Act, 2013 bearing CIN U74999TN2021PTC148728, having its registered office at No. 10, Palat Sankaran Road, Mahalingapuram, Nungambakkam, Chennai, India - 600034, and the Customer (“Customer”). MOB and Customer are sometimes referred to jointly as the “parties” or singularly as a “party.” RECITALS WHEREAS, Customer desires to obtain access to the Services with respect to certain of its information technology needs; and MOB wishes to provide the Services to Customer, on the terms and conditions set forth in this Master Subscription Agreement. NOW, THEREFORE, in consideration of the mutual covenants and promises set forth herein, and other valuable consideration, the receipt and sufficiency of which are hereby acknowledged, the parties agree as follows:</p>,
      },
      {
        key: '2',
        label: 'SERVICES',
        children: <p>1.1 Purpose <br/><br/>
        This Master Subscription or Use Agreement sets forth the terms and conditions under which MOB agrees to provide an IT enabled services & solution for the Construction, Manufacturing, Real Estate and Logistics Industry, through a Web and/or app based System/s designed for but not restricted to individuals and businesses (“Subscription/Use Service/s”) for certain software application (such software application with any applicable documentation thereto, and programming and user interfaces therefore, a “MOB Platform”) to Authorized Users related to Customer’s access to, and use of, such Subscription Services on the MOB Platform, on payment of a fee for such access as further set forth in payment receipt (“Invoice”).<br/><br/>
        1.2 The Services <br/><br/>
        Access and Right to Use Subject to the terms and conditions of this Master Subscription or Use Agreement, during the Term, MOB shall use commercially reasonable efforts to provide Customer and Authorized Users access to the MOB Platform. Subject to the terms and conditions of this Master Subscription or Use Agreement, during the Term, MOB hereby grants Customer and Authorized Users a non-exclusive, non-sublicensable, non-transferable, worldwide access and use the MOB Platform, solely for internal business purposes as set forth herein.<br/><br/>
        1.3 Subscription or Use Services <br/><br/>
        Each Invoice shall specify and further describe the Subscription/ Use Service/s to be provided in accordance with the representations and warranties set forth herein, and shall identify, fees, subscription term and other applicable terms and conditions.<br/><br/>
        1.4 Changes to MOB Platform<br/><br/>
        MOB may, in its sole discretion, make any changes to the MOB Platform that it deems necessary or useful to (i) maintain or enhance (a) the quality or delivery of MOB's products or services to its customers, (b) the competitive strength of, or market for, MOB's products or services, (c) such MOB Platform's cost efficiency or performance, or (ii) to comply with applicable law.</p>,
      },
      {
        key: '3',
        label: 'MOB PLATFORM ACCESS AND AUTHORIZED USER',
        children: <p>2.1 Administrative Users<br/><br/>
        During the configuration and set-up process for each MOB Platform, Customer will identify an administrative user name and password for Customer’s MOB account. MOB reserves the right to refuse registration of, or cancel user names and passwords it deems inappropriate. In certain use cases MOB may give the right to user to use the product and services as a guest without creating a MOB account.<br/><br/>
        2.2 Authorized Users for Subscriptions<br/><br/>
        Customer may allow such number of Customer’s employees as indicated in the Invoice to use the MOB Platform on behalf of Customer (“Authorized Users”). Authorized User subscriptions are for designated Authorized Users and cannot be shared or used by more than one Authorized User.<br/><br/>
        2.3 Authorized User Conditions to Use<br/><br/>
        As a condition to access and use of the MOB Platform, (i) each Authorized User shall agree to abide by the terms of MOB'send-user terms of use which it may adopt from time to time, (ii) Authorized User shall agree to abide by the terms of this Master Subscription or Use Agreement, or a subset hereof. Customer shall immediately notify MOB of any violation of the terms of any of the foregoing by any Authorized User upon becoming aware of such violation and shall be liable for any breach of the foregoing agreements by any Authorized User.<br/><br/>
        2.4 Account Responsibility<br/><br/>
        Customer will be responsible for (i) all uses of any account that Customer has access to, whether or not Customer has authorized the particular use or user, and regardless of Customer’s knowledge of such use, and (ii) securing its MOB account, passwords (including but not limited to administrative and user passwords) and files. MOB is not responsible for any losses, damages, costs, expenses or claims that result from stolen or lost passwords</p>,
      },
      {
        key: '4',
        label: 'ADDITIONAL RESTRICTIONS AND RESPONSIBILITIES',
        children:<p>3.1 Software Restrictions<br/><br/>
        Customer will not, nor permit or encourage any third party to, directly or indirectly (i) reverse engineer, decompile, disassemble or otherwise attempt to discover or derive the source code, object code or underlying structure, ideas, know-how or algorithms relevant to the MOB Platform or any software, documentation or data related to a MOB Platform (“Software”); (ii) modify, translate, or create derivative works based on the MOB Platform or any Software; (iii) modify, remove or obstruct any proprietary notices or labels; or (iv) use any Software or the MOB Platform in any manner to assist or take part in the development, marketing or sale of a product potentially competitive with such Software or MOB Platform. For the avoidance of doubt, Software and the Services, including all user-visible aspects of the Services, are the Confidential Information of MOB, and Customer will comply with Section 4 with respect thereto.<br/><br/>
        3.2 Customer Compliance<br/><br/>
        Customer shall use, and will ensure that all Authorized Users use, the MOB Platform, Software, and the Services in full compliance with this Master Subscription or Use Agreement, MOB's end-user terms of use and all applicable laws and regulations. Customer represents and warrants that it (i) has accessed and reviewed any terms of use or other policies relating to the MOB Platform provided by MOB, (ii) understands the requirements thereof, and (iii) agrees to comply therewith. MOB may suspend Customer’s account and access to the MOB Platform and performance of the Services at any time and without notice if MOB believes that Customer is in violation of this Master Subscription or Use Agreement. Although MOB has no obligation to monitor Customer’s use of the MOB Platform, MOB may do so and may prohibit any use it believes may be (or alleged to be) in violation of the foregoing.<br/><br/>
        3.3 Cooperation<br/><br/>
        Customer shall provide all cooperation and assistance as MOB may reasonably request to enable MOB to exercise its rights and perform its obligations under, and in connection with, this Master Subscription or Use Agreement.<br/><br/>
        3.4 Training and Education<br/><br/>
        Customer shall use commercially reasonable efforts, at all times, to educate and train themselves in the proper use and operation of the MOB Platform, and to ensure that the MOB Platform is used in accordance with applicable manuals, instructions, specifications and documentation provided by MOB from time to time.<br/><br/>
        3.5 Customer Systems<br/><br/>
        Customer shall be responsible for obtaining and maintaining—both the functionality and security of—any equipment and ancillary services needed to connect to, access or otherwise use the Buddy Platform, including modems, hardware, servers, software, operating systems, networking, web servers and the like.</p>
      },
      {
        key: '5',
        label: 'CONFIDENTIALITY',
        children:<p>4.1 Confidential Information<br/><br/>
        Each party (the “Receiving Party”) understands that the other party (the “Disclosing Party”) has been, and may be, exposed to or acquired business, technical or financial information relating to the Disclosing Party’s business (hereinafter referred to as “Confidential Information”). Confidential Information of MOB includes nonpublic information regarding features, functionality and performance of the MOB Platform and Software. Confidential Information of Customer includes non-public data provided by Customer to MOB to enable the provision of access to, and use of, the Services as well as all content, data and information recorded and stored by the MOB Platform for Customer (“Customer Data”). The terms and conditions of this Master Subscription Agreement, including all pricing and related metrics, are MOB's Confidential Information.<br/><br/>
        4.2 Exceptions<br/><br/>
        Notwithstanding anything to the contrary contained herein, Confidential Information shall not include any information that the Receiving Party can document (i) is or becomes generally available to the public, (ii) was in its possession or known by it prior to receipt from the Disclosing Party, (iii) was rightfully disclosed to it without restriction by a third party, or (iv) was independently developed without use of any Confidential Information of the Disclosing Party.<br/><br/>
        4.3 Non-use and Non-disclosure<br/><br/>
        With respect to Confidential Information of the Disclosing Party, the Receiving Party agrees to: (i) use the same degree of care to protect the confidentiality, and prevent the unauthorized use or disclosure, of such Confidential Information it uses to protect its own proprietary and confidential information of like nature, which shall not be less than a reasonable degree of care, (ii) hold all such Confidential Information in strict confidence and not use, sell, copy, transfer reproduce, or divulge such Confidential Information to any third party, (iii) not use such Confidential Information for any purposes whatsoever other than the performance of, or as otherwise authorized by, this Master Subscription or Use Agreement.<br/><br/>
        4.4 Compelled Disclosure<br/><br/>
        Notwithstanding Section 4.3, the Receiving Party may disclose Confidential Information of the Disclosing Party to the extent necessary to comply with a court order or applicable law; provided, however that the Receiving Party delivers reasonable advance notice of such disclosure to the Disclosing Party and uses reasonable efforts to secure confidential treatment of such Confidential Information, in whole or in part.<br/><br/>
        4.5 Remedies for Breach of Obligation of Confidentiality<br/><br/>
        The Receiving Party acknowledges that breach of its obligation of confidentiality may cause irreparable harm to the Disclosing Party for which the Disclosing Party may not be fully or adequately compensated by recovery of monetary damages. Accordingly, in the event of any violation, or threatened violation, by the Receiving Party of its obligations under this Section, the Disclosing Party shall be entitled to seek injunctive relief from a court of competent jurisdiction in addition to any other remedy that may be available at law or in equity, without the necessity of proving actual damages.</p>
      },
      {
        key: '6',
        label: 'PROPRIETARY RIGHTS',
        children:<p>5.1 Ownership<br/><br/>
        ustomer shall own all right, title and interest in and to the Customer Data. MOB shall own and retain all right, title and interest in and to (i) the MOB Platform, Software and the Services and all improvements, enhancements or modifications thereto, (ii) any software, applications, inventions or other technology developed in connection with the Services, and (iii) all intellectual property and proprietary rights in and related to any of the foregoing (collectively, “Services IP”). To the extent Customer acquires any right, title or interest in any Services IP, Customer hereby assigns all of its right, title and interest in such Services IP to MOB.<br/><br/>
        5.2 Customer Data<br/><br/>
        ustomer hereby grants to MON a non-exclusive, transferable, sublicensable, worldwide and royalty-free license to use and otherwise exploit Customer Data to provide the Services to Customer hereunder and as necessary or useful to monitor and improve a MOB Platform, Software and the Services, both during and after the Term. For the avoidance of doubt, Travelbud may use, reproduce and disclose MOB Platform-, Software- and Services-related information, data and material that is anonymized, deidentified, or otherwise rendered not reasonably associated or linked to Customer or any other identifiable individual person or entity for product improvement and other lawful purposes, all of which information, data and material will be owned by MOB. It is Customer’s sole responsibility to back-up Customer Data during the Term, and Customer acknowledges that it will not have access to Customer Data through the MOB Platform following the expiration or termination of this Master Subscription or Use Agreement.<br/><br/>
        5.3 No Other Rights<br/><br/>
        o rights are granted except as expressly set forth herein.</p>
      },
      {
        key: '7',
        label: 'FEES & PAYMENT',
        children:<p>
            6.1 Fees<br/><br/>
Customer will pay MOB the then-applicable fees or payments described in the Invoice, in accordance with the terms set forth therein (“Fees”), including, for the avoidance of doubt, any fees incurred through Customer’s use of the MOB Platform exceeding a services capacity parameter specified on the Invoice.<br/><br/>
6.2 Renewal Fees<br/><br/>
Upon the commencement of each Renewal Term, (i) Customer shall be liable to MOB for payment of a Renewal Fee. Customer hereby consents to MOB charging any such Renewal Fee to the credit card, or other payment method, associated with Customer’s account without need to provide any further notice or receive any further consent. Each “Renewal Fee” shall equal the Service Fee or Renewal Fee, as applicable, due to MOB during previous term as may be increased inMOB's sole discretion by a percentage up to the Fee Increase Percentage specified on the applicable Invoice.
<br/><br/>
6.3 Payment<br/><br/>
For SaaS bases payment, when applicable, MOB may choose to bill through an invoice, in which case, full payment for invoices issued in any given month must be received by MOB seven (7) days after the mailing date of the invoice (unless otherwise specified on the applicable Invoice). Unpaid amounts are subject to a finance charge of 1.5% per month on any outstanding balance, plus all expenses of collection. In addition to any other remedies available, MOB may suspend Services in the event of payment delinquency. Pre-paid payments in full or in part for purchases are subject to terms and conditions of the purchases as would be laid out at the time of purchase of any product or service from the MOB platform.<br/><br/>
6.4 Payment Disputes<br/><br/>
If Customer believes that MOB has billed Customer incorrectly, Customer must contact MOB no later than seven (7) days after the closing date on the billing statement in which the believed error or problem appeared in order to receive an adjustment or credit. Inquiries should be directed to MOB's customer support department or the concerned department looking into such issues.<br/><br/>
6.5 Taxes<br/><br/>
Customer shall pay, and shall be liable for, all taxes relating toMOB's provision of the Services hereunder.<br/><br/>
6.6 No Deductions or Setoffs<br/><br/>
All amounts payable to MOB hereunder shall be paid by the Customer to MOB in full without any setoff, recoupment, counterclaim, deduction, debit or withholding for any reason except as may be required by applicable law.
        </p>
      },
      {
        key: '8',
        label: 'TERM AND TERMINATION OF SAAS MODULES',
        children:<p>7.1 Term<br/><br/>
        This Master Subscription or Use Agreement shall remain in effect until the term or its termination as provided below. The term of each Invoice shall begin on the date such Invoice was generated to the period mentioned in the Invoice (the “Term”). Each Invoice shall renew for a period equal to the previous Term (each, a “Renewal Term”), unless written notice of non-renewal is received by the other party at least sixty (60) days, but not less than thirty (30) days, prior to the expiration of the then current term.<br/><br/>
        7.2 Termination<br/><br/>
        MOB may terminate this Master Subscription or Use Agreement upon written notice to Customer if no Invoice is in effect. In addition to any other remedies it may have, either party may also terminate this Master Subscription or Use Agreement upon written notice if the other party fails to pay any amount when due or otherwise materially breaches this Master Subscription or Use Agreement and fails to cure such breach within thirty (30) days or as agreed upon by both parties after receipt of written notice of such breach from the non-breaching party.<br/><br/>
        7.3 Effect of Termination<br/><br/>
        Upon termination of the Master Subscription or Use Agreement, each outstanding Invoice, if any, shall terminate and Customer shall immediately cease all use of, and all access to, the MOB Platform. If (i) MOB terminates this Master Subscription or Use Agreement pursuant to the second sentence of Section 7.2, or (ii) Customer terminates this Master Subscription or Use Agreement pursuant to Section 7.2, all Fees that would have become payable had each outstanding Statement of Service remained in effect until expiration of its current term will become immediately due and payable.<br/><br/>
        7.4 Survival<br/><br/>
        Sections [3.1, 4–6, 7.2, 7.4, and 9–17] shall survive any termination or expiration of this Master Subscription Agreement. All other rights and obligations shall be of no further force or effect.</p>
      },
      {
        key: '9',
        label: 'WARRANTY AND DISCLAIMER',
        children:<p>8.1 Warranties<br/><br/>
        Each party represents and warrants that it has the legal power to enter into this Master Subscription Agreement. Additionally, Customer warrants that (i) Customer owns or has a right to use and has obtained all consents and approvals necessary for the provision and use of all of the Customer Data that is placed on, transmitted via or recorded by the Buddy Platform and the Services; and (ii) the provision and use of Customer Data as contemplated by this Master Subscription Agreement and the MOB Platform and the Services does not and shall not violate any Customer’s privacy policy, terms of- use or other agreement to which Customer is a party or any law or regulation to which Customer is subject to.<br/><br/>
        8.2 Disclaimer<br/><br/>
        EXCEPT AS EXPRESSLY PROVIDED HEREIN OR IN AN INVOICE, MOB DOES NOT WARRANT THAT ACCESS TO THE MOB PLATFORMS, SOFTWARE OR SERVICES WILL BE UNINTERRUPTED OR ERROR FREE, NOR DOES MOB MAKE ANY WARRANTY AS TO THE RESULTS THAT MAY BE OBTAINED FROM USE OF THE SERVICES. FURTHER, MOB MAKES NO REPRESENTATIONS OR WARRANTIES WITH RESPECT TO SERVICES PROVIDED BY THIRD PARTY TECHNOLOGY SERVICE PROVIDERS RELATING TO OR SUPPORTING A MOB PLATFORM, INCLUDING HOSTING AND MAINTENANCE SERVICES, AND ANY CLAIM OF CUSTOMER ARISING FROM OR RELATING TO SUCH SERVICES SHALL, AS BETWEEN MOB AND SUCH SERVICE PROVIDER, BE SOLELY AGAINST SUCH SERVICE PROVIDER. THE MOB PLATFORMS, SOFTWARE AND SERVICES ARE PROVIDED “AS IS,” AND MOB DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW.</p>
      },
      {
        key: '10',
        label: 'INDEMNITY',
        children:<p>Indemnification by MOB. MOB will defend Customer against any claim, suit, demand, or action made or brought against Customer by a third party alleging that the Services, or Customer’s use or access thereof in accordance with this Master Subscription or Use Agreement, infringes any intellectual property rights of such third party, and will indemnify and hold harmless Customer from any damages, losses, liabilities, suit, demand, or action. The foregoing obligations do not apply with respect to portions or components of any MOB Platform or Service (i) not supplied by MOB, (ii) combined with other products, processes or materials where the alleged infringement relates to such combination, (iii) where Customer continues allegedly infringing activity after being notified thereof or after being informed of modifications that would have avoided the alleged infringement, or (iv) where Customer’s use of the Services is not strictly in accordance with this Master Subscription or Use Agreement.</p>
      },
      {
        key: '11',
        label: 'LIMITATION OF LIABILITY',
        children:<p>To the maximum extent permitted by law, MOB excludes all liability and responsibility to the Customer, tort (including negligence), or otherwise, for any loss (including loss of Data, profits and savings) or damage resulting, directly or indirectly, from the use of, or reliance on, the MOB Platform. The loss or damage suffered by the Customer as a result of MOB 's negligence or failure to comply to this Master Subscription or Use Agreement, any claim by Customer against MOB arising from MOB 's negligence or failure will be limited in respect of any one incident, or series of connected incidents to the last fee paid by the Customer for the current Term of the Master Subscription or Use Agreement. If the Customer is not satisfied with the MOB Platform, Customer’s sole and exclusive remedy is to terminate the Master Subscription or Use Agreement where applicable.</p>
      },
      {
        key: '12',
        label: 'GOVERNING LAW AND DISPUTE RESOLUTION',
        children:<p>This Master Subscription or Use Agreement, regardless of where executed, shall be subject to, governed by and construed in accordance with the laws of India. The courts in New Delhi shall have exclusive jurisdiction to settle any dispute or claim that arises out of or in connection with this Agreement</p>
      },
      {
        key: '13',
        label: 'PUBLICITY',
        children:<p>Customer agrees that MOB may identify Customer as a customer and use Customer’s logo and trademark in MOB's promotional materials. Customer may request that MOB stop doing so by submitting an email to ask@madoverbuildings.com at any time.Customer acknowledges that it may take MOB up to 30 days to process such request. Notwithstanding anything herein to the contrary, Customer acknowledges that MOB may disclose the existence and terms and conditions of this Master Subscription or Use Agreement to its advisors, actual and potential sources of financing and to third parties for purposes of due diligence.</p>
      },
      {
        key: '14',
        label: 'NOTICES',
        children:<p>All notices, consents, and other communications between the parties under or regarding this Master Subscription or Use Agreement must be in writing (which includes email and facsimile) and be addressed according to information provided on the Invoice. All notices, consents and other communications between the parties under a Invoice will be sent to the recipient’s address specified thereon. All communications will be deemed to have been received on the date actually received. Either party may change its address for notices by giving written notice of the new address to the other party in accordance with this Section.</p>
      },
      {
        key: '15',
        label: 'FORCE MAJEURE',
        children:<p>MOB is not responsible nor liable for any delays or failures in performance of the MOB Platform from any cause beyond its control, including, but not limited to acts of God, changes to law or regulations, embargoes, war, terrorist acts, acts or omissions of third party technology providers, riots, fires, earthquakes, floods, power blackouts, strikes, weather conditions or acts of hackers, internet service providers or any other third party or acts or omissions of Customer or any Authorized User.</p>
      },
      {
        key: '16',
        label: 'ASSIGNMENT',
        children:<p>Customer will not assign this Master Subscription or Use Agreement to any third party without the prior written consent of the MOB. MOB can assign this Master Subscription or Use Agreement to any third party without any requirement for intimation to the Customer in connection with an assignment to any third party or to an affiliate or in connection with any merger, reorganization, consolidation, sale of assets or similar transaction. MOB may sublicense any or all of its obligations hereunder.</p>
      },
      {
        key: '17',
        label: 'GENERAL PROVISIONS',
        children:<p>If any provision of this Master Subscription or Use Agreement is invalid, unenforceable or prohibited by Applicable Law, this Master Subscription Agreement shall be considered divisible as to such provision and such provision shall be inoperative and shall not be part of the consideration moving from any party to the other parties, and the remainder of this Master Subscription or Use Agreement shall be valid, binding and of like effect as though such provision was not included herein. This Master Subscription or Use Agreement, together with Invoice entered into hereunder and all exhibits, annexes and addenda hereto and thereto is the complete and exclusive statement of the mutual understanding of the parties and supersedes and cancels all previous written and oral agreements, communications and other understandings relating to the subject matter of this Master Subscription or Use Agreement. All waivers and modifications must be in a writing signed by both parties, except as otherwise provided herein. No agency, partnership, joint venture, or employment is created as a result of this Master Subscription or Use Agreement, and neither party has authority of any kind to bind the other party in any respect whatsoever. In the event of a conflict between this Master Subscription or Use Agreement and any Invoice, such Invoice shall prevail unless otherwise expressly indicated in this Master Subscription or Use Agreement or such Invoice. The heading references herein are for convenience purposes only and shall not be deemed to limit or affect any of the provisions hereof. Unless otherwise indicated to the contrary herein by the context or use thereof:<br/><br/><br/><br/>
        (i) the words “hereof,” “hereby,” “herein,” “hereto,” and “hereunder” and words of similar import shall refer to this Master Subscription or Use Agreement as a whole and not to any particular Section or paragraph of this Master Subscription or Use Agreement;<br/><br/>
        (ii) the words “include,” “includes” or “including” are deemed to be followed by the words “without limitation;”<br/><br/>
        (iii) references to a “Section” or “Exhibit” are references to a section of, or exhibit to this Master Subscription Agreement; and<br/><br/>
        (iv) derivative forms of defined terms will have correlative meanings.</p>
      },
  ];

  return (
    <div>
      <Typography.Title level={4}>Terms and conditions</Typography.Title>
      <Collapse className="custom-collapse-terms" items={items} defaultActiveKey={1} expandIconPosition="right" />

    </div>
  );
};

export default TermsDetails;
